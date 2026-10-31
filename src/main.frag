#version 120 // glsl version 1.2 for OpenGL 2.1

// Uniforms 
// NOTE: not used for now.
// uniform int g_windowWidth;
// uniform int g_windowHeight;

void main(void) {
    // Fragment shader should output into gl_FragColor an RGBA:
    // NOTE: I am assuming that the texture coordinates are supposed to be the RGB values since the values make sense.
    // I don't know why color wasn't set instead?
    gl_FragColor = vec4(gl_TexCoord[0].xy, 0, 1);  // NOTE: blue is 0, alpha is always 1. use interpolated RG values
}
