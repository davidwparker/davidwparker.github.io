// Sobel edge detection
//    -1 -2 -1       1 0 -1
// Gy= 0  0  0   Gx= 2 0 -2
//     1  2  1       1 0 -1
vec4 so_tx0y0 = sample(-1.0,-1.0, p,dim);
vec4 so_tx0y1 = sample(-1.0,+0.0, p,dim);
vec4 so_tx0y2 = sample(-1.0,+1.0, p,dim);
vec4 so_tx1y0 = sample(+0.0,-1.0, p,dim);
vec4 so_tx1y2 = sample(+0.0,+1.0, p,dim);
vec4 so_tx2y0 = sample(+1.0,-1.0, p,dim);
vec4 so_tx2y1 = sample(+1.0,+0.0, p,dim);
vec4 so_tx2y2 = sample(+1.0,+1.0, p,dim);

// color values from matrix
vec4 so_colorGy = -so_tx0y0 - 2.0*so_tx1y0 - so_tx2y0
    +              so_tx0y2 + 2.0*so_tx1y2 + so_tx2y2;

vec4 so_colorGx = so_tx0y0 -     so_tx2y0
    +         2.0*so_tx0y1 - 2.0*so_tx2y1
    +             so_tx0y2 -     so_tx2y2;

// grab a single color so we can normalize
float so_fColorGx = so_colorGx.r;
float so_fColorGy = so_colorGy.r;

// norm
float so_norm = sqrt(so_fColorGx * so_fColorGx + so_fColorGy * so_fColorGy);
color = vec4(so_norm,so_norm,so_norm,1.0);
