// LICENSE: http://unlicense.org/
#define M1 1597334677U     //1719413*929
#define M2 3812015801U     //140473*2467*11
#define PI 3.1415926538
#define PI2 6.2831853076

uniform sampler2D uNoiseMap;
uniform sampler2D uImageTexture;
uniform float uProgress;
uniform vec3 uBackgroundColor;
uniform float uNoiseFactor;
uniform float uRand;
uniform float uTime;

varying vec2 vUv;

void main() {

    vec4 col = vec4(1.);
    col.xyz = uBackgroundColor;
    // noise
    float uvNoise = texture2D(uNoiseMap, vUv.xy / 5. + vec2(uRand)  ).x * 0.09104 * uNoiseFactor;
    vec4 img = texture2D(uImageTexture, vUv + uvNoise *  2.);
    col.xyz = img.xyz;

    gl_FragColor = col;
}