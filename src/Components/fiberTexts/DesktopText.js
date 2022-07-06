import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Box, Flex, useFlexSize, useReflow } from "@react-three/flex";
import { Suspense, useEffect } from "react";
import ThreeImage from "../Image/ThreeImage";
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
    // console.log(width);
    // const marginX = width > 2 ? width * 0.0378 : 0.01;
    // const marginTop = width * 0.16944444444;
    const marginX = 0.15;
    const marginTop = 0.469;
    const blackHex = 0x32292e;
    return (
        <Suspense fallback={null}>
            <ThreeImage
                position={[0.4, -height - 0.3, -0.6]}
                rotation-z={-Math.PI * 0.02}
            />
            <ThreeImage
                position={[0.6, -height - 0.45, -0.4]}
                rotation-z={-Math.PI * 0.02}
                scale={0.7}
            />
            <ThreeImage
                position={[-0.6, -height - 2.3, -0.6]}
                rotation-z={Math.PI * 0.02}
            />
            <Flex
                dir="column"
                position={[-width / 2, height / 2, 0]}
                size={[width, height, 0]}

                // alignItems="center"
                // justifyContent="center"
            >
                {/* <Reflower /> */}
                {/* <HeightReporter /> */}
                <Box
                    dir="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    // width={1}
                    height="100%"
                >
                    <Box>
                        <Text
                            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                            font="https://cdn.bmschoi.dev/discostudio/PangramSansRounded/PPPangramSansRounded-Bold.otf"
                            color={blackHex}
                            fontSize={Math.max(0.04444 * width, 0.07444)}
                        >
                            Brandon Choi
                        </Text>
                    </Box>
                    <Box marginTop={0.00694444444 * width}>
                        <Text
                            color="black"
                            fontSize={Math.max(width * 0.0111096, 0.02444)}
                            textAlign="center"
                        >
                            Front-End developer w/ a hint of Motion,
                            Interaction, & UX Design
                        </Text>
                    </Box>
                </Box>
                <Box
                    dir="column"
                    alignItems="center"
                    // alignItems="center"
                    justifyContent="flex-start"
                    // justifyContent="center"
                    width="100%"
                    // width={1}
                    height="auto"
                    // paddingRight={marginX}
                    // paddingLeft={marginX}
                    position-z={-0.5}
                >
                    <Box marginTop={marginTop}>
                        <Text bold color={blackHex}>
                            {"Hi, my name is\nBrandon (Minseok) Choi"}
                        </Text>
                    </Box>
                    <Box marginTop={marginTop}>
                        <Text bold color={blackHex}>
                            {"I go by bmschoi or\nawesomechoi11 online"}
                        </Text>
                    </Box>
                    <Box marginTop={marginTop}>
                        <Text bold color={blackHex}>
                            {"and I am a\nfront-end developer!"}
                        </Text>
                    </Box>

                    <Box marginTop={marginTop}>
                        <Text
                            bold
                            color={blackHex}
                            textAlign="center"
                            // maxWidth={(viewport.width / 4) * 3}
                        >
                            {
                                "I like to design and create things\nwith code that are visually and\nmentally stimulating"
                            }
                        </Text>
                    </Box>
                    <Box marginTop={marginTop}>
                        <Text
                            bold
                            color={blackHex}
                            textAlign="center"
                            // maxWidth={(viewport.width / 4) * 3}
                        >
                            {"crafting fun seamless\nexperiences is my passion"}
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Suspense>
    );
}

function HeightReporter({ onReflow }) {
    const size = useFlexSize();
    console.log(size);
    // useLayoutEffect(() => onReflow && onReflow(...size), [onReflow, size]);
    return null;
}

function Reflower() {
    const { viewport } = useThree();
    const { width, height } = viewport;
    const reflow = useReflow();
    // useEffect(() => {
    //     reflow();
    //     console.log("reflow!");
    // }, [width, height]);
    useFrame(reflow);
    return null;
}
