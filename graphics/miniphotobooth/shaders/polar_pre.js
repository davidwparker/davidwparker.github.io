// convert to polar coordinates
normCoord = 2.0 * texcoord - 1.0; // [-1.0,1.0] x [-1.0,1.0]
radius = length(normCoord); 
// adjust for mouse
phi = atan(normCoord.y+mouse.y, normCoord.x+mouse.x);

