// Self picture-in-picture
// via: http://coding-experiments.blogspot.com/2010/06/self-projection.html
// location and size of self picture in picture
vec2 slf_start1 = vec2(0.65,0.65);
vec2 slf_size1 = vec2(0.35,0.35);
vec2 slf_start2 = slf_start1 + slf_start1*slf_size1; 
vec2 slf_size2 = slf_size1*slf_size1;

// check location and size to see if in rectangle and what to draw
// tiny image
if (inside(texcoord, slf_start2, slf_size2)) {
    color = texture2D(sampler0, (texcoord - slf_start2)/slf_size2);
} 
// small image
else if (inside(texcoord, slf_start1, slf_size1)) {
    color = texture2D(sampler0, (texcoord - slf_start1)/slf_size1);
}
// main image, leave as is
