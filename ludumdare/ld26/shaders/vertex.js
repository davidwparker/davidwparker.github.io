// Attributes
attribute vec3 aVertex;
attribute vec4 aColor;

// Uniforms
uniform mat4 uPMatrix;

// Varyings
varying vec4 vColor;

// main
void main(void) {
    vColor = aColor;
    gl_Position = uPMatrix * vec4(aVertex, 1.0);
}
