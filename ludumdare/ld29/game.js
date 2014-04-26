/*
 * CONSTANTS
 */
var FINGER_START = -350;
var FINGER_STOP = -28;
var SKIN_HEIGHT = 392;

/*
 * GameState
 */
var GameState = function(game) {
};

// Load images
GameState.prototype.preload = function() {
  this.game.load.image('background', 'assets/background.png');
  this.game.load.image('skin', 'assets/skin.png');
  this.game.load.image('finger', 'assets/finger.png');
  this.game.load.image('zit', 'assets/zit.png');
};

// Setup the example
GameState.prototype.create = function() {

  // Create background
  this.game.add.sprite(0, 0, 'background');

  // Create skin (as a fake object)
  this.game.add.sprite(0, SKIN_HEIGHT, 'skin');
  this.game.skin = { HEIGHT: SKIN_HEIGHT };

  // Add hand group, hand, and finger
  var finger = new Finger(this.game, this.game.width/2, FINGER_START, this.game.input);
  finger.START = FINGER_START;
  finger.STOP = FINGER_STOP;
  this.game.finger = finger;
  this.game.add.existing(finger);

  // Create a zits group, add zits to it, then randomly display them after X time
  var zits = this.game.add.group();
  zits.enableBody = true;
  zits.physicsBodyType = Phaser.Physics.ARCADE;

  for (var i=0; i<3; i++) {
    zits.add(new Zit(this.game, this.game.world.randomY, SKIN_HEIGHT));
  }
  this.game.add.existing(zits);
  this.game.zits = zits;

  // Create new zits and add to group every X seconds
  this.zitLoop = 1;
  var timer = this.game.time.create(false);
  timer.loop(1000, this.addZits, this);
  timer.start();

  // Show FPS
  this.game.time.advancedTiming = true;
  this.fpsText = this.game.add.text( 20, 20, '', { font: '16px Arial', fill: '#ffffff' } );

  // Enable keyboard
  //this.game.cursors = this.game.input.keyboard.createCursorKeys();

  // Game conditions
  this.scoreText = this.game.add.text( 650, 20, '', { font: '16px Arial', fill: '#ffffff' } );
  this.gameOverText = this.game.add.text( 20, this.game.height/2, '', { font: '40px Arial', fill: '#ff0000' } );
  this.gameOverSubText = this.game.add.text( 300, this.game.height/2-100, '', { font: '20px Arial', fill: '#ffffff' } );
  this.game.zitsPopped = 0;
  this.game.zitsExploded = 0;
  this.LOSE = 2;
};

// Text updates and check for end game conditions here
GameState.prototype.update = function() {

  // Set FPS
  if (this.game.time.fps !== 0) {
    this.fpsText.setText(this.game.time.fps + ' FPS');
  }

  // Set score as Zits Popped
  this.scoreText.setText(this.game.zitsPopped + ' Zits Popped');

  // Check end game conditions
  if (this.gameOver()) {
    // END GAME!
    this.gameOverText.setText('2 Zits have exploded... no date for you!');
    this.gameOverSubText.setText('Press refresh to play again...');
  }
};

GameState.prototype.addZits = function() {
  var z = this.game.rnd.integerInRange(1, 5);
  for (var i=0; i<z; i++) {
    this.game.zits.add(new Zit(this.game, this.game.world.randomY, SKIN_HEIGHT));
  }
  this.zitLoop++;
}

GameState.prototype.gameOver = function() {
  return this.game.zitsExploded >= this.LOSE;
};


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
