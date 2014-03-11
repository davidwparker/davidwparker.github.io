var CD_START_TARGET_X = 160;
var CD_START_TARGET_Y = 160;
var CD_TARGET_FILTER_FACTOR = 0.025;

var Doggie = function () {
	this._isCollided = false;
	this._currentRotation = 0;
    this.xTarget = CD_START_TARGET_X * gScaleFactor;
    this.yTarget = CD_START_TARGET_Y * gScaleFactor;
};

Doggie.prototype.handleTouch = function(loc) {
	this.rotate(loc);
}

Doggie.prototype.handleTouchMove = function(loc) {
	this.rotate(loc);
}

Doggie.prototype.rotate = function(loc) {
	this.xTarget = loc.x;
    this.yTarget = loc.y;
	var angle = Math.atan2(loc.x-this.rootNode.getPosition().x,loc.y-this.rootNode.getPosition().y);
	angle = angle * (180/Math.PI);
	this._currentRotation = angle;
}

Doggie.prototype.onUpdate = function() {
    // Calculate the new position
    var oldPosition = cc.pMult(this.rootNode.getPosition(), 1.0 / gScaleFactor);
    var xNew = (this.xTarget / gScaleFactor) * CD_TARGET_FILTER_FACTOR + oldPosition.x * (1 - CD_TARGET_FILTER_FACTOR);
    var yNew = (this.yTarget / gScaleFactor) * CD_TARGET_FILTER_FACTOR + oldPosition.y * (1 - CD_TARGET_FILTER_FACTOR);
    this.rootNode.setPosition(xNew * gScaleFactor, yNew * gScaleFactor);

    // Rotate the doggie
    this.rootNode.setRotation(this._currentRotation);
};

Doggie.prototype.handleCollisionWith = function(gameObjectController) {
	// Found a hydrant
    if (gameObjectController.controllerName == "Hydrant") {
    	
    	// if it's currently firing (always take a hit)
    	if (gameObjectController.isFiring) {
    		if (!this.isCollided) {
    			this.isCollided = true;
//		        cc.AudioEngine.getInstance().playEffect("doghurt.mp3");
    		}
    	    sharedGameScene.setHealth(sharedGameScene.health - 1);
    		if (sharedGameScene.getHealth() <= 0) {
    			// Game over
	    	}
    	} else {
    		this.isCollided = false;
    	}
    	
    	// Take a leak
        sharedGameScene.setScore(sharedGameScene.score + 1);
        if (this.rootNode.animationManager.getRunningSequenceName() != "Leak") {
	        this.rootNode.animationManager.runAnimationsForSequenceNamed("Leak");
        }
        
    }
};
