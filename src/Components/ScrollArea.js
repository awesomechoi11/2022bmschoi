import { useSetRecoilState } from "recoil";
import * as THREE from "three";
import { currentScrollPosAtom, mouseAtom } from "../state";

export default function ScrollArea({ height, children }) {
    const setMouse = useSetRecoilState(mouseAtom);
    const settCurrentScrollPos = useSetRecoilState(currentScrollPosAtom);

    return (
        <div
            className="scroll-area"
            onScroll={(e) => {
                settCurrentScrollPos(e.target.scrollTop);
            }}
            onPointerMove={(e) => {
                setMouse([e.clientX, e.clientY]);
            }}
        >
            <div style={{ height }}>{children}</div>
        </div>
    );
}
