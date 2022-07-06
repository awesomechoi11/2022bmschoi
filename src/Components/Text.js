import React from "react";
import { useReflow } from "@react-three/flex";
import { Text as TextImpl } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Text({
    bold = false,
    anchorX = "left",
    anchorY = "top",
    textAlign = "center",
    ...props
}) {
    const reflow = useReflow();
    // const { viewport, invalidate } = useThree();
    // const scale = Math.min(1, viewport.width / 16);
    const font = bold
        ? "https://cdn.bmschoi.dev/discostudio/PangramSansRounded/PPPangramSansRounded-Bold.otf"
        : "https://cdn.bmschoi.dev/discostudio/PangramSansRounded/PPPangramSansRounded-Medium.otf";
    return (
        <TextImpl
            anchorX={anchorX}
            anchorY={anchorY}
            textAlign={textAlign}
            onSync={() => {
                reflow();
                // invalidate();
            }}
            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
            // fontSize={Math.max(viewport.width * 0.03333333333, 0.044)}
            fontSize={0.09}
            font={font}
            // position-z={-0.1}
            // width={1}
            // maxWidth={viewport.width}
            {...props}
        />
    );
}
