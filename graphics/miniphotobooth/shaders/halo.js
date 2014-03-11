// added is the mixture to add
vec4 added = vec4(1.0);

// halo density
float density = 5.0;

// distance to target
float distance = distance(vec2(0.5,0.5),texcoord);

// factor
float factor = exp(-abs(distance * density));

