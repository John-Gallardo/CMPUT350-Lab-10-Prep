#version 120 // glsl version 1.2 for OpenGL 2.1

// Uniforms 
uniform int g_windowWidth;
uniform int g_windowHeight;
uniform vec2 g_mousePos;  // NOTE: this is in SFML's window coordinate system!!! i.e +y is down

void main(void) {
    // Fragment shader should output into gl_FragColor an RGBA:
    // NOTE: I am assuming that the texture coordinates are supposed to be the RGB values since the values make sense.
    // I don't know why color wasn't set instead?
    gl_FragColor = vec4(gl_TexCoord[0].xy, 0, 1);  // NOTE: blue is 0, alpha is always 1. use interpolated RG values

    // Problem 2: if we are within 10 pixels of the mouse position, draw a circle instead
    // 1. grab vector from center of screen in window coordinates to mouse pos in SFML coordinates
    vec2 mousePos = g_mousePos - vec2(g_windowWidth / 2.0f, g_windowHeight / 2.0f);
    // 2. flip y because +y is up in GLSL
    mousePos.y = -mousePos.y;
    // 3. grab vector from center of screen to current window position
    vec2 windowPos = gl_FragCoord.xy - vec2(g_windowWidth / 2.0f, g_windowHeight / 2.0f);
    // distance formula for check
    if (sqrt(pow(windowPos.x - mousePos.x, 2) + pow(windowPos.y - mousePos.y, 2)) <= 10) {
        gl_FragColor = vec4(1.0f, 1.0f, 1.0f, 1.0f);
    }
}
