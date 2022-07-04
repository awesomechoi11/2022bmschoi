import { atom, useRecoilState } from "recoil";
import * as random from "js-randomize";
import { Vector3 } from "three";
const flowerListAtom = atom({
    key: "flowerListAtom",
    default: [],
});

export default function useFlowerControls() {
    const [flowerList, setFlowerList] = useRecoilState(flowerListAtom);

    function addFlower(opts) {
        const size = Math.random();
        //generate random numbers
        setFlowerList([
            ...flowerList,
            {
                stage: 1,
                lifeDuration: random.float(2000, 4000),
                rotationSpeedFactor: 1,
                // scaleFactor: 0.4 + size * 1.6,
                scaleFactor: 1,
                position: [
                    random.float(-1, 1),
                    random.float(-0.5, 0.5),
                    -size * 4,
                ],
                petalColor: random.array([
                    new Vector3(249, 177, 189).divideScalar(255), // pink
                    new Vector3(253, 163, 74).divideScalar(255), // orange
                    new Vector3(250, 25, 83).divideScalar(255), // hot pink
                    new Vector3(126, 0, 199).divideScalar(255), // purple
                    new Vector3(40, 101, 70).divideScalar(255), // green
                    new Vector3(40, 188, 188).divideScalar(255), // turqoise
                ])[0],
                ...opts,
            },
        ]);
    }

    return { addFlower, flowerList, setFlowerList };
}
