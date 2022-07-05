import { atom, useRecoilState, selector } from "recoil";
import * as random from "js-randomize";
import { Vector3 } from "three";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

const flowerListAtom = atom({
    key: "flowerListAtom",
    default: [],
});

const flowerListSelector = selector({
    key: "flowerListSelector",
    get: ({ get }) => get(flowerListAtom),
    set: ({ get, set }, { action, data }) => {
        const flowerList = get(flowerListAtom);
        switch (action) {
            case "removeFlower": {
                set(
                    flowerListAtom,
                    flowerList.filter((flower) => flower.flowerId !== data)
                );
                break;
            }
            case "addFlower": {
                const size = Math.random();
                //generate random numbers
                set(flowerListAtom, [
                    ...flowerList,
                    {
                        flowerId: nanoid(),
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
                            new Vector3(0, 173, 122).divideScalar(255), // light green
                            new Vector3(40, 188, 188).divideScalar(255), // turqoise
                            new Vector3(251, 210, 88).divideScalar(255), // yellow
                        ])[0],
                        petalCount: random.int(5, 7),
                        ...data,
                    },
                ]);
                break;
            }
            default:
                break;
        }
    },
});

export default function useFlowerControls() {
    const [flowerList, setFlowerList] = useRecoilState(flowerListSelector);

    function removeFlower(flowerId) {
        setFlowerList({ action: "removeFlower", data: flowerId });
    }

    function addFlower(opts) {
        setFlowerList({ action: "addFlower", data: opts });
    }

    return { addFlower, flowerList, removeFlower };
}
