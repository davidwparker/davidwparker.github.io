var Hydrant = function(){
	this.rotation = 0;
	this.speed = Math.random() * 5;
	this.isFiring = false;
};

Hydrant.prototype.onDidLoadFromCCB = function () {
	this.rootNode.onFireUpdate = function(dt)
    {
        this.controller.onFireUpdate();
    };
    this.rootNode.schedule(this.rootNode.onFireUpdate, this.speed, this.rootNode.onFireUpdate, 5);
}

Hydrant.prototype.onUpdate = function() {
	this.rotation += this.speed;
	this.rootNode.setRotation(this.rotation);
	if (this.rootNode.animationManager.getRunningSequenceName() == "Firing") {
		this.isFiring = true;
	} else {
		this.isFiring = false;
	}
};

Hydrant.prototype.onFireUpdate = function() {
	if (this.rootNode.animationManager.getRunningSequenceName() != "Firing") {
		this.rootNode.animationManager.runAnimationsForSequenceNamed("Firing");
	}
}

Hydrant.prototype.handleCollisionWith = function(doggieController) {
};
