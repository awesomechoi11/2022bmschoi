import { shaderMaterial, useAspect, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import fragmentShader from "./flowerfrag.glsl";
import { useControls } from "leva";
import { useSpring, useTransform } from "framer-motion";
import bezier from "bezier-easing";
import * as random from "js-randomize";
import useFlowerControls from "./useFlowerControls";

const vertexShader = `
varying vec2 vUv;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`;

const easeingFunc = bezier(0.25, 0.59, 0.09, 1);

export default function Flower({
    lifeDuration,
    stage,
    rotationSpeedFactor,
    scaleFactor,
    position,
    petalColor,
    expire = true,
    petalCount = 5,
    flowerId,
}) {
    const material = useRef();
    const noiseTexture = useTexture("/noise.png");
    const ref = useRef();

    const progress = useSpring(0, { stiffness: 10, damping: 3 });
    const progressRange = [0, 1, 2];
    const uGlobalScale = useTransform(progress, progressRange, [-0.2, 1, 0], {
        ease: [easeingFunc, easeingFunc],
    });
    const uPetalDistance = useTransform(
        progress,
        progressRange,
        [0, 1.2, 1.4],
        {
            ease: [easeingFunc, easeingFunc],
        }
    );
    const uNoiseFactor = useTransform(progress, progressRange, [1, 1, 4], {
        ease: [easeingFunc, easeingFunc],
    });
    const uRotationVelocity = useTransform(
        progress,
        progressRange,
        [0.2, 0.01, 0.07],
        {
            ease: [easeingFunc, easeingFunc],
        }
    );

    const uniforms = useRef({
        uNoiseMap: { value: noiseTexture },
        uProgress: { value: uGlobalScale.get() },
        uPetalDistance: { value: uPetalDistance.get() },
        uNoiseFactor: { value: uNoiseFactor.get() },
        uPetalCount: { value: petalCount },
        uPetalColor: { value: petalColor },
        uRand: { value: Math.random() },
        uTime: { value: 0 },
    });

    useFrame(({ clock }) => {
        ref.current.rotateZ(uRotationVelocity.get() * -rotationSpeedFactor);

        if (noiseTexture) {
            noiseTexture.wrapS = THREE.RepeatWrapping;
            noiseTexture.wrapT = THREE.RepeatWrapping;
        }
        uniforms.current.uPetalCount.value = petalCount;
        uniforms.current.uNoiseMap.value = noiseTexture;
        uniforms.current.uProgress.value = uGlobalScale.get();
        uniforms.current.uPetalDistance.value = uPetalDistance.get();
        uniforms.current.uPetalColor.value = petalColor;
        uniforms.current.uNoiseFactor.value = uNoiseFactor.get();
        uniforms.current.uTime.value = clock.getElapsedTime();
        // console.log(clock);
        material.current.needsUpdate = true;
    });

    useEffect(() => {
        progress.set(stage);
    }, [stage]);
    const { removeFlower } = useFlowerControls();
    useEffect(() => {
        if (!expire) return;

        let timeoutId = setTimeout(() => {
            progress.set(2);
            setTimeout(() => {
                removeFlower(flowerId);
            }, 1000);
        }, lifeDuration);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [expire]);

    return (
        <mesh ref={ref} position={position}>
            <planeBufferGeometry
                args={[0.5 * scaleFactor, 0.5 * scaleFactor, 1, 1]}
            />
            <shaderMaterial
                ref={material}
                uniforms={uniforms.current}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
                // depthTest={false}
            ></shaderMaterial>
        </mesh>
    );
}
