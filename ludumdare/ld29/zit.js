// Zit constructor
var Zit = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'zit');

  // big zit
  this.scale.setTo(1.5, 1.5);
  this.y = this.y - this.height/2;

  // Set the pivot point for this sprite to the center
  this.anchor.setTo(0.0, 0.0);

  // Keep count of times grown
  this.growRate = 1.035;
  this.growth = 0;
  this.squishRate = this.growRate*1.3;

  // Physics
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  // Create our Timer, Set TimerEvent to occur after 200 milliseconds, Start
  var timer = this.game.time.create(false);
  timer.loop(200, this.growZit, this);
  timer.start();
};

// Zit are a type of Phaser.Sprite
Zit.prototype = Object.create(Phaser.Sprite.prototype);
Zit.prototype.constructor = Zit;

// Zit recycle


// Zit Update!
Zit.prototype.update = function() {
  // do nothing...
};

// Slowly grow the zit
Zit.prototype.growZit = function() {

  // return if killed
  if (this.alive === false) return;

  // if squishing negative growth and return
  if (this.game.physics.arcade.overlap(this, this.game.finger)) {
    this.growth -= 5;
    this.scale.setTo(this.scale.x/(this.squishRate), this.scale.y/(this.squishRate));
    this.x = this.x - this.scale.x/100;
    this.y = this.y - this.scale.y/100;
    return;
  }

  // set current growth level
  this.growth++;
  this.scale.setTo(this.scale.x*this.growRate, this.scale.y*this.growRate);
  this.x = this.x - this.scale.x/100;
  this.y = this.y - this.scale.y/100;

  // if this zit has grown 30 times, then explode
  if (this.growth === 10) {
    this.game.zitsExploded++;
  }
};
