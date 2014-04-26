// Finger constructor
var Finger = function(game, x, y, target) {
  Phaser.Sprite.call(this, game, x, y, 'finger');

  // Store Finger FINGER_START and other constants
  this.SPEED = 2000;
  this.SPEEDX = 500;

  // big finger
  this.scale.setTo(0.9, 0.9);

  // Save the target that this Finger will follow
  // The target is any object with x and y properties
  this.target = target;

  // Set the pivot point for this sprite to the center
  this.anchor.setTo(0.0, 0.0);

  // Enable physics on this object
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};

// Fingers are a type of Phaser.Sprite
Finger.prototype = Object.create(Phaser.Sprite.prototype);
Finger.prototype.constructor = Finger;

// Finger Update!
Finger.prototype.update = function() {

  // Keyboard input
  /*
  if (this.game.cursors.left.isDown ||
      this.game.cursors.right.isDown ||
      this.game.cursors.down.isDown) {
    if (this.game.cursors.left.isDown) {
      console.log('left');
      this.body.velocity.x = -this.SPEEDX;
    }
    else if (this.game.cursors.right.isDown) {
      this.body.velocity.x = this.SPEEDX;
    }

    if (this.game.cursors.down.isDown) {
      this.body.velocity.y = -this.SPEED;
    }
  }
  */
  // X position
  if (!this.game.input.mousePointer.isDown) {
    this.body.x = this.game.input.x; //-this.width/4;
  }

  // Y position
  // while clicking
  if (this.game.input.mousePointer.isDown) {

    // if we reach the skin
    if (this.body.y >= (this.game.skin.HEIGHT-this.height)) {

      // stop moving
      this.body.velocity.y = 0;
      this.body.y = this.STOP;

      // otherwise
    } else {

      //  2000 speed on mouse down
      this.game.physics.arcade.moveToPointer(this, this.SPEED);
    }

    // check for collision!
    this.game.physics.arcade.overlap(this, this.game.zits, this.collideFingerZit, null, this);
  }

  // mouse up, it should go back up
  else {

    // goes back up by same speed
    this.body.velocity.y = -this.SPEED;

    // if we get back to starting position
    if (this.body.y <= this.START) {

      // stop moving
      this.body.velocity.y = 0;
      this.body.y = this.START;
    }

  }

};

Finger.prototype.collideFingerZit = function(finger, zit) {
  if (zit.growth <= 0) {
    zit.kill();
    this.game.zitsPopped++;
  }


//  var r = this.game.zits.remove(zit);
//  zit.kill();
//  console.log(r);
//  console.log('collided!')
}
