// Glow
// via: http://myheroics.wordpress.com/2008/09/04/glsl-bloom-shader/
vec4 gw_sum = vec4(0);
const int strength = 4;

// Gaussian smoothing for glow strength
for(int i= -strength; i < strength; i++) {
    for (int j = -strength; j < strength; j++) {
        gw_sum += texture2D(sampler0, texcoord + vec2(j,i)*0.004) * 0.25;
    }
}

// Change color based on r value to get the glow effect
// less R
if (color.r < 0.3) {
    color = gw_sum*gw_sum*0.012 + color;
}
// medium R
else if (color.r < 0.5) {
    color = gw_sum*gw_sum*0.009 + color;
}
// high R
else {
    color = gw_sum*gw_sum*0.0075 + color;
}
