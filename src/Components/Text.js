import React from "react";
import { useReflow } from "@react-three/flex";
import { Text as TextImpl } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Text({
    bold = false,
    anchorX = "left",
    anchorY = "top",
    textAlign = "left",
    ...props
}) {
    const reflow = useReflow();
    const { viewport } = useThree();
    const scale = Math.min(1, viewport.width / 16);

    return (
        <TextImpl
            anchorX={anchorX}
            anchorY={anchorY}
            textAlign={textAlign}
            onSync={reflow}
            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
            fontSize={viewport.width * 0.03333333333}
            font={
                bold
                    ? "https://cdn.bmschoi.dev/discostudio/PangramSansRounded/PPPangramSansRounded-Bold.otf"
                    : "https://cdn.bmschoi.dev/discostudio/PangramSansRounded/PPPangramSansRounded-Medium.otf"
            }
            {...props}
        />
    );
}
