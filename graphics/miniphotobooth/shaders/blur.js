// Blur
//   1 2 1
//   2 1 2   / 13
//   1 2 1
float b_one = 1.0/13.0;
float b_two = 2.0/13.0;

// algorithm
color = b_one*sample(-1.0,+1.0, p,dim) + b_two*sample(0.0,+1.0, p,dim) + b_one*sample(+1.0,+1.0, p,dim)
    +   b_two*sample(-1.0,+0.0, p,dim) + b_one*sample(0.0,+0.0, p,dim) + b_two*sample(+1.0,+0.0, p,dim)
    +   b_one*sample(-1.0,-1.0, p,dim) + b_two*sample(0.0,-1.0, p,dim) + b_one*sample(+1.0,-1.0, p,dim);
