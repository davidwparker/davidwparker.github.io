// Thermal
// via http://coding-experiments.blogspot.com/2010/10/thermal-vision-pixel-shader.html
float th_lum = (color.r+color.g+color.b) / 3.0; // luminance is gray factor
vec4 colors[3];
colors[0] = vec4(0.0,0.0,1.0,1.0);
colors[1] = vec4(1.0,1.0,0.0,1.0);
colors[2] = vec4(1.0,0.0,0.0,1.0);

// algorithm
if (th_lum < 0.5) {
    color = mix(colors[0],colors[1],th_lum/0.5);
} else {
    color = mix(colors[1],colors[2],(th_lum-0.5)/0.5);
}
