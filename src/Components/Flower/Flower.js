import { shaderMaterial, useAspect, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import fragmentShader from "./flowerfrag.glsl";

const vertexShader = `
varying vec2 vUv;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`;

console.log(fragmentShader);

export default function Flower() {
    const material = useRef();
    const noiseTexture = useTexture("/noise.png");
    const { viewport, camera } = useThree();
    const ref = useRef();
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0]);
    const scale = useAspect(
        width, // Pixel-width
        height, // Pixel-height
        1 // Optional scaling factor
    );
    // useFrame(() => {
    //     material.current.uniforms.uNoiseMap.value = noiseTexture;
    // });
    if (noiseTexture) {
        noiseTexture.wrapS = THREE.RepeatWrapping;
        noiseTexture.wrapT = THREE.RepeatWrapping;
    }

    return (
        <mesh ref={ref}>
            {/* <planeBufferGeometry args={[width, height, 1, 1]} /> */}
            <planeBufferGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
                ref={material}
                uniforms={{
                    uThreshold: 0,
                    uNoiseMap: { value: noiseTexture },
                    uScale: { value: scale },
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            ></shaderMaterial>
        </mesh>
    );
}
