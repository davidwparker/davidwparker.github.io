// Setup global variables
var gSettingMusicEnabled = true;

var sharedGameScene;
var gWinSize;
var gScaleFactor = 2;

// Constants
var MAX_HEALTH = 1000;

// Main scene
var MainScene = function(){};

MainScene.prototype.onDidLoadFromCCB = function () {
	sharedGameScene = this;
    gWinSize = cc.Director.getInstance().getWinSize();

    // Start playing looped background music
    cc.AudioEngine.getInstance().setEffectsVolume(0.2);
    cc.AudioEngine.getInstance().preloadEffect("doghurt.mp3");
    if (gSettingMusicEnabled)
    {
//    	cc.AudioEngine.getInstance().playMusic("Music.mp3");
    }

	this.score = 0;
	this.health = MAX_HEALTH;

    // Forward relevant touch events to controller (this)
    this.rootNode.onTouchesBegan = function(touches, event)
    {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };
    this.rootNode.onTouchesMoved = function(touches, event)
    {
        this.controller.onTouchesMoved(touches, event);
        return true;
    };
    this.rootNode.onMouseDragged = function(event)
    {
        this.controller.onMouseDragged(event);
        return true;
    };

	// schedules
    this.rootNode.onUpdate = function(dt)
    {
        this.controller.onUpdate();
    };
    this.rootNode.schedule(this.rootNode.onUpdate);
};

//
// Labels
//
MainScene.prototype.setScore = function(score)
{
    this.score = score;
    this.scoreLabel.setString(""+score);
};

MainScene.prototype.getScore = function()
{
    return this.score;
};

MainScene.prototype.setHealth = function(health)
{
	this.health = health;
	this.healthLabel.setString(""+Math.round(health / MAX_HEALTH * 100)+"%");
}

MainScene.prototype.getHealth = function()
{
	return this.health;
}

//
// Events
//
MainScene.prototype.onTouchesBegan = function(touches, event)
{
    this.doggie.controller.handleTouch(touches[0].getLocation());
};

MainScene.prototype.onTouchesMoved = function(touches, event)
{
    this.doggie.controller.handleTouchMove(touches[0].getLocation());
};

MainScene.prototype.onMouseDragged = function(event)
{
    var loc = event.getLocation();
    this.doggie.controller.xTarget = loc.x;
    this.doggie.controller.yTarget = loc.y;
};


// Main game loop
MainScene.prototype.onUpdate = function(dt)
{
    var i=0;
    var gameObject = null;
    var gameObjectController = null;

    // Iterate though all objects in the level layer
    var children = this.rootNode.getChildren();
    for (i = 0; i < children.length; i++)
    {
        // Check if the child has a controller (only the updatable objects will have one)
        gameObject = children[i];
        gameObjectController = gameObject.controller;
        if (gameObjectController)
        {
            // Update all game objects
            gameObjectController.onUpdate();
            if (gameObject !== this.doggie)
            {
            	var gameObjRect = gameObject.getBoundingBox();
		       	var doggieRect = this.doggie.getBoundingBox();

	            // Check for collisions with doggie
            	if (cc.rectIntersectsRect(gameObjRect, doggieRect))
                {
                    gameObjectController.handleCollisionWith(this.doggie.controller);
                    this.doggie.controller.handleCollisionWith(gameObjectController);
                }
            }
        }
    }

    // Check for objects to remove
    for (i = children.length-1; i >=0; i--)
    {
        gameObject = children[i];
        gameObjectController = gameObject.controller;
        if (gameObjectController && gameObjectController.isScheduledForRemove)
        {
            this.rootNode.removeChild(gameObject);
        }
    }
};