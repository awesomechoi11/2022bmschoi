uniform float uThreshold;
uniform sampler2D uNoiseMap;
uniform vec3 uScale;
varying vec2 vUv;

float smin( float a, float b, float k ) {
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}
float sdCircle( vec2 uv, vec2 position , float radius){
  return distance(uv , position) - radius;
}

void main() {

    float iFloat1 = 1.;
    float iFloat2 = 2.;
    // vec4 noiseTexture = texture2D(uNoiseMap, vUv.xy * uScale.xy);
    // background color
    vec3 col = vec3(0.937,0.922,0.925);
    // noise
    vec4 noiseTexture = texture2D(uNoiseMap, vUv.xy );

    float globalProgress = 0.5; // 0 - 1;
    vec2 centerPosition = vec2( 0.540, 0.480) * iTime / 3.41089; // (0,0) - (1,1)
    float startingAngle = iFloat2 * 0.6;

    // base
    float baseBigRadius = 0.17262;
    float baseRadius = (0.17934 + uvNoise * 1.32965)  * globalProgress;
    float sdf = sdCircle(uv, centerPosition, baseRadius);
    // petals
    float petalBigRadius = 0.12;
    float petalBigDistance = 0.2;
    int petalCount = 5;

    for(int petalIndex = 0; petalIndex < petalCount; petalIndex++){
        float petalAngle = startingAngle +  PI2/float(petalCount) * float(petalIndex);
        float petalRadius = (petalBigRadius + uvNoise * 0.64591) * globalProgress;
        vec2 petalPosition = vec2(cos(petalAngle),sin(petalAngle)) * petalBigDistance * iFloat1 + centerPosition;
        sdf = smin(sdf,sdCircle(uv, petalPosition, petalRadius ),0.04582);
    }

    
    gl_FragColor = vec4(col,1.0);
}