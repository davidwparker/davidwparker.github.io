var THREEkb = THREEkb || {};
THREEkb.KeyboardState = function() {
    this.keyCodes	= {};
    this.modifiers	= {};
    var self	= this;
    this._onKeyDown	= function(event){ self._onKeyChange(event, true); };
    this._onKeyUp	= function(event){ self._onKeyChange(event, false);};
    document.addEventListener("keydown", this._onKeyDown, false);
    document.addEventListener("keyup", this._onKeyUp, false);
}

THREEkb.KeyboardState.prototype.destroy	= function() {
	document.removeEventListener("keydown", this._onKeyDown, false);
	document.removeEventListener("keyup", this._onKeyUp, false);
}

THREEkb.KeyboardState.MODIFIERS	= ['shift', 'ctrl', 'alt', 'meta'];
THREEkb.KeyboardState.ALIAS = {
    'left'	: 37,
    'up'	: 38,
    'right'	: 39,
    'down'	: 40,
    'space'	: 32,
    'pageup'	: 33,
    'pagedown'	: 34,
    'tab'	: 9
};

THREEkb.KeyboardState.prototype._onKeyChange = function(event, pressed) {
    // update this.keyCodes
    var keyCode	= event.keyCode;
    this.keyCodes[keyCode] = pressed;

    // update this.modifiers
    this.modifiers['shift'] = event.shiftKey;
    this.modifiers['ctrl'] = event.ctrlKey;
    this.modifiers['alt'] = event.altKey;
    this.modifiers['meta'] = event.metaKey;
}

THREEkb.KeyboardState.prototype.pressed	= function(keyDesc) {
    var keys = keyDesc.split("+");
    for(var i = 0; i < keys.length; i++){
	var key = keys[i];
	var pressed;
	if( THREEkb.KeyboardState.MODIFIERS.indexOf( key ) !== -1 ){
	    pressed = this.modifiers[key];
	}else if( Object.keys(THREEkb.KeyboardState.ALIAS).indexOf( key ) != -1 ){
	    pressed = this.keyCodes[THREEkb.KeyboardState.ALIAS[key]];
	}else {
	    pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)]
	}
	if(!pressed) return false;
    };
    return true;
}
