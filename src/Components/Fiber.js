import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import Text from "./Text";
import { Box, PerspectiveCamera } from "@react-three/drei";
import Flower from "./Flower/Flower";
import CameraControls from "camera-controls";
import { useRef } from "react";
import * as THREE from "three";

CameraControls.install({ THREE });
extend({ CameraControls });

function Controls() {
    const ref = useRef();
    const camera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    useFrame((state, delta) => ref.current.update(delta));
    return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
}

export default function Fiber() {
    return (
        <div id="canvas-container">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={30} />

                {/* <mesh>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
                <mesh position={[1, 1, 1]}>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh> */}

                <Flower />
                <Controls />
            </Canvas>
        </div>
    );
}
