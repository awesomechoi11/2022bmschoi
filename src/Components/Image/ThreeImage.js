import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import fragmentShader from "./imagefrag.glsl";
import vertexShader from "./vert.glsl";
import bezier from "bezier-easing";
import { Vector3 } from "three";

export default function ThreeImage({
    stage = 1,
    scaleFactor = 1,
    position = [0, 0, 0],
    backgroundColor = new Vector3(249, 177, 189).divideScalar(255),
    imgSrc = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ...props
}) {
    const material = useRef();
    const [noiseTexture, imageTexture] = useTexture(["/noise.png", imgSrc]);
    const ref = useRef();
    const easeingFunc = bezier(0.25, 0.59, 0.09, 1);

    const progress = useSpring(0, { stiffness: 10, damping: 3 });
    const progressRange = [0, 1, 2];
    const uGlobalScale = useTransform(progress, progressRange, [-0.2, 1, 0], {
        ease: [easeingFunc, easeingFunc],
    });
    const uNoiseFactor = useTransform(progress, progressRange, [1, 1, 4], {
        ease: [easeingFunc, easeingFunc],
    });

    const uniforms = useRef({
        uNoiseMap: { value: noiseTexture },
        uBackgroundColor: { value: backgroundColor },
        uImageTexture: { value: imageTexture },
        uProgress: { value: uGlobalScale.get() },
        uNoiseFactor: { value: uNoiseFactor.get() },
        uRand: { value: Math.random() },
        uTime: { value: 0 },
    });

    useFrame(({ clock }) => {
        // ref.current.rotateZ(uRotationVelocity.get() * -rotationSpeedFactor);

        if (noiseTexture) {
            noiseTexture.wrapS = THREE.RepeatWrapping;
            noiseTexture.wrapT = THREE.RepeatWrapping;
        }
        uniforms.current.uNoiseMap.value = noiseTexture;
        uniforms.current.uImageTexture.value = imageTexture;
        uniforms.current.uProgress.value = uGlobalScale.get();
        uniforms.current.uBackgroundColor.value = backgroundColor;
        uniforms.current.uNoiseFactor.value = uNoiseFactor.get();
        uniforms.current.uTime.value = clock.getElapsedTime();
        // console.log(clock);
        material.current.needsUpdate = true;
    });

    useEffect(() => {
        progress.set(stage);
    }, [stage]);

    return (
        <mesh ref={ref} position={position} {...props}>
            <planeBufferGeometry
                args={[0.5 * scaleFactor, 0.5 * scaleFactor, 1, 1]}
            />
            <shaderMaterial
                ref={material}
                uniforms={uniforms.current}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                // transparent={true}
                // depthTest={false}
            ></shaderMaterial>
        </mesh>
    );
}
