#version 120 // glsl version 1.2 for OpenGL 2.1

// Uniforms
uniform sampler2D g_texture;
uniform int g_windowWidth;
uniform int g_windowHeight;


void main() {
    // Fragment shader should output into gl_FragColor an RGBA:
    // 1. Convert texture coordinates into screenspace (window) coordinates
    vec2 texCoordScreenFloat = vec2(gl_TexCoord[0].x * g_windowWidth, gl_TexCoord[0].y * g_windowHeight);

    // 2. Convert to nearest integer so we grab the closest pixel
    // NOTE: using floor() instead of round() because round() isn't supported until GLSL 1.3 or later!!!
    ivec2 texCoordScreenInt = ivec2(floor(texCoordScreenFloat.x + 0.5), floor(texCoordScreenFloat.y + 0.5));

    // 3. Double loop for iterating through 5x5 pixels (2 rows before to 2 rows after, 2 columns before to 2 columns after)
    vec4 textureColor = vec4(0.0f, 0.0f, 0.0f, 1.0f);  // start with all black, but alpha = 1
    for (int i = texCoordScreenInt.x - 2; i <= texCoordScreenInt.x + 2; i++) {
        for (int j = texCoordScreenInt.y - 2; j <= texCoordScreenInt.y + 2; j++) {
            // convert back to texture coordinate space & add color to textureColor
            vec2 currTexCoord = vec2(float(i) / g_windowWidth, float(j) / g_windowHeight);
            vec4 currTextureColor = texture2D(g_texture, currTexCoord);
            textureColor += currTextureColor;
        }
    }
    
    // 4. average by dividing by 25 & set gl_FragColor
    textureColor /= 25;
    gl_FragColor = textureColor;
}
