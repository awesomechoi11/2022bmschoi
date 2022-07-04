import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import Text from "./Text";
import { Box, PerspectiveCamera, useAspect } from "@react-three/drei";
import Flower from "./Flower/Flower";
import CameraControls from "camera-controls";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import useFlowerControls from "./Flower/useFlowerControls";

CameraControls.install({ THREE });
extend({ CameraControls });

function Controls() {
    const ref = useRef();
    const camera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    useFrame((state, delta) => ref.current.update(delta));
    return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
}

var vec = new THREE.Vector3(); // create once and reuse
var pos = new THREE.Vector3(); // create once and reuse

export default function Fiber() {
    const { addFlower, flowerList } = useFlowerControls();
    useEffect(() => {
        addFlower();
    }, []);

    // const { viewport, camera } = useThree();
    // const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0]);
    // const scale = useAspect(
    //     width, // Pixel-width
    //     height, // Pixel-height
    //     1 // Optional scaling factor
    // );
    const cameraRef = useRef();
    return (
        <div id="canvas-container">
            <Canvas
                onClick={(event) => {
                    console.log("click!");
                    //https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
                    vec.set(
                        (event.clientX / window.innerWidth) * 2 - 1,
                        -(event.clientY / window.innerHeight) * 2 + 1,
                        0.5
                    );
                    let camera = cameraRef.current;
                    vec.unproject(camera);

                    vec.sub(camera.position).normalize();

                    var distance =
                        -camera.position.z / vec.z + Math.random() * 4;

                    pos.copy(camera.position).add(vec.multiplyScalar(distance));
                    // pos.setZ(-Math.random() * 4);
                    console.log(pos);
                    console.log(event);
                    addFlower({
                        position: pos.toArray(),
                    });
                }}
            >
                <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 2]}
                    fov={30}
                    ref={cameraRef}
                />

                {/* <mesh>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
                <mesh position={[1, 1, 1]}>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh> */}
                {flowerList.map((props, index) => (
                    <Flower key={index} {...props} />
                ))}

                <Controls />
            </Canvas>
        </div>
    );
}
