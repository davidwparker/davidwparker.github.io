// Pixelated
// via: http://coding-experiments.blogspot.com/2010/06/pixelation.html
float px_dx = 6.0*(1.0/512.0);
float px_dy = 6.0*(1.0/512.0);

// floor value based on tex coord x and y
vec2 coord = vec2(px_dx*floor(texcoord.x/px_dx),
                  px_dy*floor(texcoord.y/px_dy));
color = texture2D(sampler0, coord);
