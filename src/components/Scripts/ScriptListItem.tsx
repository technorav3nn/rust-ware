import {
    IconDownload,
    IconEye,
    IconMessageCircle,
    IconThumbDown,
    IconThumbUp,
} from "@tabler/icons-react";
import {
    Card,
    Text,
    Group,
    Center,
    createStyles,
    getStylesRef,
    rem,
} from "@mantine/core";
import { AnimatePresence, motion, stagger } from "framer-motion";
import random from "lodash/random";
import { MouseEvent, useEffect, useRef } from "react";
import { openModal } from "@mantine/modals";

const useStyles = createStyles((theme, _params, getRef) => {
    const image = getRef.variant;

    return {
        card: {
            position: "relative",
            height: rem(280),
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],

            [`&:hover .${getStylesRef("image")}`]: {
                transform: "scale(1.03) translateY(-5%)",
                filter: "blur(1.03px)",
            },
        },

        image: {
            ...theme.fn.cover(),
            ref: getStylesRef("image"),
            backgroundSize: "cover",
            transition: "transform 500ms ease, filter 500ms ease",
        },

        overlay: {
            position: "absolute",
            top: "20%",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
        },

        content: {
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            zIndex: 1,
        },

        title: {
            color: theme.white,
            marginBottom: rem(5),
        },

        bodyText: {
            color: theme.colors.dark[2],
            marginLeft: rem(7),
        },

        author: {
            color: theme.colors.dark[2],
        },
    };
});

interface ImageCardProps {
    image: string;
    title: string;
    author: string;
    saves: number;
    animationDelay: number;
}

const ANIMATION_VARIANTS = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
        transition: {
            opacity: {
                duration: 1,
                delay: 0.4,
            },
            y: 0,
            transition: { ease: [0.78, 0.14, 0.15, 0.86] },
        },
    },
};

export function ScriptListItem({
    image,
    title,
    author,
    saves,
    animationDelay,
}: ImageCardProps) {
    const { classes, theme } = useStyles();

    const showScriptDetails = (e: MouseEvent) => {
        e.preventDefault();
        openModal({
            title: "Script Details",
            centered: true,
            size: "min(80%, 1200px)",
            children: "Nigga",
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                key={title}
                initial={{ opacity: 0.3, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: animationDelay,
                    ease: "backOut",
                }}
            >
                <Card
                    p="lg"
                    shadow="lg"
                    className={classes.card}
                    component="a"
                    target="_blank"
                    style={{
                        cursor: "pointer",
                    }}
                    radius="sm"
                    onClick={showScriptDetails}
                >
                    <div
                        className={classes.image}
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                    <div className={classes.overlay} />

                    <div className={classes.content}>
                        <div>
                            <Text
                                size="lg"
                                className={classes.title}
                                weight={500}
                            >
                                {title}
                            </Text>

                            <Group position="apart" spacing="xs">
                                <Group spacing="lg">
                                    <Center>
                                        <IconDownload
                                            size="1rem"
                                            stroke={1.5}
                                            color={theme.colors.dark[2]}
                                        />
                                        <Text
                                            size="sm"
                                            className={classes.bodyText}
                                        >
                                            {saves}
                                        </Text>
                                    </Center>
                                </Group>
                            </Group>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
