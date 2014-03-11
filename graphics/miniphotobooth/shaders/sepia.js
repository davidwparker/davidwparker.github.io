// sepia (value via wikipedia)
float sep_gray = (color.x + color.y + color.z) / 3.0;
vec3 sepia = vec3(112.0/255.0, 66.0/255.0, 20.0/255.0);
color = vec4(Overlay(sepia,vec3(sep_gray)),color.a);
