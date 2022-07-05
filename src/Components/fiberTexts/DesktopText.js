import { useAspect } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Box, Flex, useReflow } from "@react-three/flex";
import { Suspense, useEffect } from "react";
import Text from "../Text";

export default function DesktopText() {
    const { viewport } = useThree();
    const { width, height } = viewport;

    // const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0]);
    // const scale = useAspect(
    //     width, // Pixel-width
    //     height, // Pixel-height
    //     1 // Optional scaling factor
    // );
    const marginY = width * 0.1778;
    const marginTop = width * 0.06944444444;
    return (
        <Suspense fallback={null}>
            <Flex
                dir="column"
                position={[-width / 2, height / 2, -0.1]}
                size={[width, height, 0]}
                alignItems="center"
                justifyContent="flex-start"
            >
                {/* <Reflower /> */}
                <Box
                    dir="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                >
                    <Box>
                        <Text
                            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                            font="https://cdn.bmschoi.dev/discostudio/PangramSansRounded/PPPangramSansRounded-Bold.otf"
                            color={0x32292e}
                        >
                            Brandon Choi
                        </Text>
                    </Box>
                    <Box marginTop={0.00694444444 * width}>
                        <Text color="black" scale={0.24}>
                            Front-End developer w/ a hint of Motion,
                            Interaction, & UX Design
                        </Text>
                    </Box>
                </Box>
                <Box
                    dir="column"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    // alignItems="center"
                    width="100%"
                    height="auto"
                >
                    <Box marginTop={marginTop} marginLeft={marginY}>
                        <Text bold color={0x32292e}>
                            {"Hi, my name is\nBrandon (Minseok) Choi"}
                        </Text>
                    </Box>
                    <Box marginTop={marginTop} marginLeft={marginY}>
                        <Text bold color={0x32292e}>
                            {"I go by bmschoi or\nawesomechoi11 online"}
                        </Text>
                    </Box>
                    <Box marginTop={marginTop} marginLeft={marginY}>
                        <Text bold color={0x32292e}>
                            {"and I am a\nfront-end developer!"}
                        </Text>
                    </Box>
                </Box>
                <Box
                    dir="column"
                    alignItems="flex-end"
                    justifyContent="flex-start"
                    width="100%"
                    height="auto"
                >
                    <Box marginTop={marginTop} marginRight={marginY}>
                        <Text bold color={0x32292e} textAlign="right">
                            {
                                "I like to design and create things\nwith code that are visually and\nmentally stimulating"
                            }
                        </Text>
                    </Box>
                    <Box marginTop={marginTop} marginRight={marginY}>
                        <Text bold color={0x32292e} textAlign="right">
                            {"crafting fun seamless\nexperiences is my passion"}
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Suspense>
    );
}

function Reflower() {
    const { viewport } = useThree();
    const { width, height } = viewport;
    const reflow = useReflow();
    useEffect(() => {
        reflow();
        console.log("reflow!");
    }, [width, height]);
    return null;
}
