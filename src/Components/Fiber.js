import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import CameraControls from "camera-controls";
import { Perf } from "r3f-perf";
import { useMemo, useRef } from "react";
import {
    useRecoilBridgeAcrossReactRoots_UNSTABLE,
    useRecoilState,
    useRecoilValue,
} from "recoil";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";
import { throttle } from "throttle-debounce";
import { currentScrollPosAtom, mouseAtom } from "../state";
import DesktopText from "./fiberTexts/DesktopText";
import Flower from "./Flower/Flower";
import useFlowerControls from "./Flower/useFlowerControls";
import ThreeImage from "./Image/ThreeImage";

var pos = new THREE.Vector3(); // create once and reuse
var vec = new THREE.Vector3(); // create once and reuse

CameraControls.install({ THREE });
extend({ CameraControls });

// function Controls() {
//     const ref = useRef();
//     const camera = useThree((state) => state.camera);
//     const gl = useThree((state) => state.gl);
//     useFrame((state, delta) => ref.current.update(delta));
//     return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
// }

function clamp(min, max, val) {
    return Math.min(Math.max(val, min), max);
}

const throttledAddFlower = throttle(200, (mouse, camera, addFlower) => {
    //https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z

    vec.set(
        (mouse[0] / window.innerWidth) * 2 - 1,
        -(mouse[1] / window.innerHeight) * 2 + 1,
        0.5
    );

    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    var distance = -camera.position.z / vec.z + Math.random() * 4 + 1;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    // pos.setZ(-Math.random() * 4);

    addFlower({
        position: pos.toArray(),
    });
});

function Controls() {
    const camera = useThree((state) => state.camera);
    const { addFlower } = useFlowerControls();

    const mouse = useRecoilValue(mouseAtom);
    const currentScrollPos = useRecoilValue(currentScrollPosAtom);
    const lerpedScrollPos = useRef(0);

    const previousMouse = useRef([0, 0]);

    useFrame(() => {
        lerpedScrollPos.current = lerp(
            lerpedScrollPos.current,
            currentScrollPos,
            0.07
        );

        const height =
            document.querySelector(".scroll-area").scrollHeight -
            document.documentElement.clientHeight;
        const scrolled = lerpedScrollPos.current / height;

        camera.position.setY(-scrolled * 3.5);
        camera.rotation.set(
            (-(mouse[1] / window.innerHeight) * 2 + 1) * 0.002,
            (-(mouse[0] / window.innerWidth) * 2 + 1) * 0.002,
            0
        );
        if (previousMouse.current !== mouse) {
            throttledAddFlower(mouse, camera, addFlower);
        }
        previousMouse.current = mouse;
    });

    return null;
}

export default function Fiber() {
    const { flowerList } = useFlowerControls();

    const cameraRef = useRef();
    const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

    return (
        <>
            <div id="canvas-container">
                <Canvas>
                    <RecoilBridge>
                        <Controls />
                        <Perf />
                        <PerspectiveCamera
                            makeDefault
                            position={[0, 0, 2]}
                            fov={30}
                            ref={cameraRef}
                        />
                        <spotLight
                            castShadow
                            angle={0.3}
                            penumbra={1}
                            position={[0, 10, 20]}
                            intensity={5}
                            shadow-mapSize-width={1024}
                            shadow-mapSize-height={1024}
                        />
                        <DesktopText position={[0, 0, 0]} />

                        {flowerList.map((props) => (
                            <Flower key={props.flowerId} {...props} />
                        ))}
                    </RecoilBridge>
                </Canvas>
            </div>
        </>
    );
}
