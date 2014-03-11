function setupLoad(asset, src, callback) {
    var pendingAssets=0,totalAssets=0;
    ++pendingAssets;
    ++totalAssets;

    var loadInfo = [0];
    function loaded() {
	callback(asset);
	if (loadInfo[0] == 0) {
	    --pendingAssets;
	    if (pendingAssets <= 0) {
                // this is where I would be done...
	    }
	    loadInfo[0] = 1;
	}
    }
    if (asset.play) {
	asset.addEventListener('canplaythrough', loaded);
    } else {
	asset.onload = loaded;
    }
    asset.onerror = function() {
        //	alert("Failed to load " + src);
    }
    asset.src = src;
}
/**
 * Returns a random number between min and max
 */
function randomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
