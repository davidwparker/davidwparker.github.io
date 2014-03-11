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
uniform vec2 mouse;

// sample, used for blur, dilation, erosion, sharpen, laplacian, sobel, prewitt
vec4 sample(float dx, float dy, vec2 p,vec2 dim) {
    return texture2D(sampler0, (p + vec2(dx,dy)) / dim);
}

// Overlay distance, used for sepia
// Computes the overlay value between the source and destination colors.
float OverlayValue(float sv, float dv) {
    // if (dst <= Ω) then: 2 * src * dst
    // if (dst > Ω) then: 1 - 2 * (1 - dst) * (1 - src)
    return (dv <= 0.5) ? (2.0 * sv * dv) : (1.0 - 2.0 * (1.0 - dv) * (1.0 - sv));
}
// Overlay as a vec3
vec3 Overlay (vec3 src, vec3 dst) {
    return vec3(OverlayValue(src.x, dst.x),OverlayValue(src.y, dst.y),OverlayValue(src.z, dst.z));
}

// Check to see if location is inside x location based on size, used for self
bool inside(in vec2 xloc, in vec2 loc, in vec2 size) {
    return xloc[0] >= loc[0] && 
        xloc[1] >= loc[1] && 
        xloc[0] <= loc[0]+size[0] && 
        xloc[1] <= loc[1]+size[1];
}

void main() {
    // dim, point, texcoord, color
    vec2 dim = vec2(width, height);
    vec2 p = vec2(gl_FragCoord.x, height-gl_FragCoord.y);
    vec2 texcoord = p/dim;
    vec4 color = texture2D(sampler0, texcoord);
