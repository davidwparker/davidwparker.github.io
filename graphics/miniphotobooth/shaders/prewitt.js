// Prewitt edge detection
//    -1 -1 -1       1 0 -1
// Gy= 0  0  0   Gx= 1 0 -1
//     1  1  1       1 0 -1
vec4 pr_tx0y0 = sample(-1.0,-1.0, p,dim);
vec4 pr_tx0y1 = sample(-1.0,+0.0, p,dim);
vec4 pr_tx0y2 = sample(-1.0,+1.0, p,dim);
vec4 pr_tx1y0 = sample(+0.0,-1.0, p,dim);
vec4 pr_tx1y2 = sample(+0.0,+1.0, p,dim);
vec4 pr_tx2y0 = sample(+1.0,-1.0, p,dim);
vec4 pr_tx2y1 = sample(+1.0,+0.0, p,dim);
vec4 pr_tx2y2 = sample(+1.0,+1.0, p,dim);

// color values from matrix
vec4 pr_colorGy = -pr_tx0y0 - pr_tx1y0 - pr_tx2y0
    +              pr_tx0y2 + pr_tx1y2 + pr_tx2y2;

vec4 pr_colorGx = pr_tx0y0 - pr_tx2y0
    +          pr_tx0y1 - pr_tx2y1
    +          pr_tx0y2 - pr_tx2y2;

// grab a single color so we can normalize
float pr_fColorGx = pr_colorGx.r;
float pr_fColorGy = pr_colorGy.r;

// norm
float pr_norm = sqrt(pr_fColorGx * pr_fColorGx + pr_fColorGy * pr_fColorGy);
color = vec4(pr_norm,pr_norm,pr_norm,1.0);
