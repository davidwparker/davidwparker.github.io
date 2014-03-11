// Mirror
if (texcoord.x > 0.5) {
    texcoord.x = 1.0 - texcoord.x;
}
color = texture2D(sampler0, texcoord);
