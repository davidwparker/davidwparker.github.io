// Attributes
attribute vec3 aVertex;
attribute vec4 aColor;
attribute vec2 aTexCoord;
 
// Uniforms
uniform mat4 uPMatrix;

// Varyings
varying vec4 vColor;
varying vec2 vTexCoord;

// main   
void main(void) {
    vColor = aColor;
    vTexCoord = aTexCoord;
    gl_Position = uPMatrix * vec4(aVertex, 1.0);
}
