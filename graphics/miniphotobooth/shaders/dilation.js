// Dilation
// maximum of 3x3 kernel
color = sample(0.0,0.0, p,dim);
color = max(color, sample(-1.0,+1.0, p,dim));
color = max(color, sample(+0.0,+1.0, p,dim));
color = max(color, sample(+1.0,+1.0, p,dim));
color = max(color, sample(-1.0,+0.0, p,dim));
color = max(color, sample(+1.0,+0.0, p,dim));
color = max(color, sample(-1.0,-1.0, p,dim));
color = max(color, sample(+0.0,-1.0, p,dim));
color = max(color, sample(+1.0,-1.0, p,dim));
