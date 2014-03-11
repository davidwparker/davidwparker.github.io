// Sharpen
//   -1 -1 -1
//   -1  9 -1
//   -1 -1 -1
color = -sample(-1.0,+1.0, p,dim) -     sample(0.0,+1.0, p,dim) - sample(+1.0,+1.0, p,dim)
    -    sample(-1.0,+0.0, p,dim) + 9.0*sample(0.0,+0.0, p,dim) - sample(+1.0,+0.0, p,dim)
    -    sample(-1.0,-1.0, p,dim) -     sample(0.0,-1.0, p,dim) - sample(+1.0,-1.0, p,dim);
