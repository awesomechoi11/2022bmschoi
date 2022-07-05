import { atom } from "recoil";

export const currentScrollPosAtom = atom({
    key: "currentScrollPosAtom",
    default: 0,
});

export const mouseAtom = atom({
    key: "mouseAtom",
    default: [0, 0],
});
