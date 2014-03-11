// back to cartesian coordinates
normCoord.x = radius * cos(phi);
normCoord.y = radius * sin(phi);
texcoord = normCoord / 2.0 + 0.5; // [0.0,1.0] x [0.0,1.0]
color = texture2D(sampler0, texcoord);
