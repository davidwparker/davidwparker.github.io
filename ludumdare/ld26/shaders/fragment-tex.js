precision mediump float;

// Uniforms
uniform sampler2D uTex;

// Varyings
varying lowp vec4 vColor;
varying mediump vec2 vTexCoord;

// main
void main(void) {
    gl_FragColor = vColor * texture2D(uTex, vTexCoord);
}
