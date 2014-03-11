// Emboss
//   2  0  0
//   0 -1  0
//   0  0 -1

#ifdef GL_ES
precision highp float;
#endif

// used to compute texture2D
uniform sampler2D sampler0;
uniform float width;
uniform float height;

// extra fun with color
uniform float r;
uniform float g;
uniform float b;

vec4 sample(float dx, float dy, vec2 p,vec2 dim) {
    return texture2D(sampler0, (p + vec2(dx,dy)) / dim);
}

void main() {
    // dim and point
    vec2 dim = vec2(width, height);
    vec2 p = vec2(gl_FragCoord.x, height - gl_FragCoord.y);

    // algorithm
    vec4 color = 2.0*sample(-1.0,+1.0, p,dim) + 0.0 + 0.0
        +        0.0                         - sample(0.0,+0.0, p,dim) + 0.0
        +        0.0                         + 0.0                     - sample(+1.0,-1.0, p,dim);

    // set
    gl_FragColor = vec4(color.r*r,color.g*g,color.b*b,color.a);
}
