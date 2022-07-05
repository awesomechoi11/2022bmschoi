// LICENSE: http://unlicense.org/
#define M1 1597334677U     //1719413*929
#define M2 3812015801U     //140473*2467*11
#define PI 3.1415926538
#define PI2 6.2831853076

uniform sampler2D uNoiseMap;
uniform float uProgress;
uniform float uPetalDistance;
uniform vec3 uPetalColor;
uniform int uPetalCount;
uniform float uNoiseFactor;
uniform float uRand;
uniform float uTime;

varying vec2 vUv;

float smin( float a, float b, float k ) {
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}
float sdCircle( vec2 uv, vec2 position , float radius){
  return distance(uv , position) - radius;
}

void main() {


    // vec4 noiseTexture = texture2D(uNoiseMap, vUv.xy * uAspectRatio.xy);
    // background color
    // vec3 col = vec3(0.937,0.922,0.925);
    vec4 col = vec4(0.);
    // noise
    float uvNoise = texture2D(uNoiseMap, vUv.xy / 5. + vec2(uRand)  ).x * 0.09104 * uNoiseFactor;
    // float uvNoise = texture2D(uNoiseMap, vUv.xy / 5. + vec2(uTime / 45.) ).x * 0.12104 * uNoiseFactor;

    vec2 uv = vUv.xy;

    float globalProgress = uProgress; // 0 - 1;
    vec2 centerPosition = vec2( 0.5) ; // (0,0) - (1,1)
    float startingAngle = 1. * 0.6;

    // base
    float baseBigRadius = 0.17262;
    float baseRadius = (0.17934 + uvNoise * 1.32965)  * globalProgress;
    float sdf = sdCircle(uv, centerPosition, baseRadius);
    // petals
    float petalBigRadius = 0.12;
    float petalBigDistance = 0.2;

    for(int petalIndex = 0; petalIndex < uPetalCount; petalIndex++){
        float petalAngle = startingAngle +  PI2/float(uPetalCount) * float(petalIndex);
        float petalRadius = (petalBigRadius + uvNoise * 0.64591) * globalProgress;
        vec2 petalPosition = vec2(cos(petalAngle),sin(petalAngle)) * petalBigDistance * uPetalDistance * sqrt((float(uPetalCount) / 5. )) + centerPosition ;
        sdf = smin(sdf,sdCircle(uv, petalPosition, petalRadius ),0.04582);
    }

    if(sdf < 0.){
        // col = vec4(0.992,0.639,0.29,1.);
        col = vec4(uPetalColor,1. - smoothstep(-0.002,.0,sdf));
    }

    // center  
    float centerBigRadius = 0.05800;
    float centerDelay = centerBigRadius * 0.5 * (1.- globalProgress);
    float centerRadius = (centerBigRadius + uvNoise * 0.29405) * globalProgress - centerDelay;
    float center = sdCircle(uv, centerPosition, centerRadius );
    if(center < 0.){
        col = vec4(0.196,0.161,0.18,1.);
    }

    // gl_FragColor = vec4(col,1.0);
    gl_FragColor = col;
}