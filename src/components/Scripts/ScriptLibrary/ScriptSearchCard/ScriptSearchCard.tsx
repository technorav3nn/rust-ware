import { Card, Text, Group, Badge } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent } from "react";
import { openModal } from "@mantine/modals";
import { ScriptModal } from "../ScriptInfo";
import { useStyles } from "./index.styles";

interface ImageCardProps {
    image: string;
    title: string;
    saves: number;
    animationDelay: number;
}

export function ScriptListItem({
    image,
    title,
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
            children: (
                <ScriptModal
                    image={image}
                    title={title}
                    author="Unknown"
                    saves={saves}
                />
            ),
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
                    ease: "backInOut",
                }}
            >
                <Card
                    key={title}
                    className={classes.card}
                    onClick={showScriptDetails}
                >
                    <div
                        // A banner image
                        className={classes.image}
                        // Set the image as a background using static nextjs module import
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                    <div
                        // A shadow from the below to make the text more readable
                        className={classes.overlay}
                    />
                    <div
                        // A container for the content
                        // Which sticks to the bottom of the card
                        className={classes.content}
                    >
                        <div>
                            <Text
                                size="lg"
                                className={classes.title}
                                weight={500}
                            >
                                {title}
                            </Text>

                            <Text size="sm" className={classes.description}>
                                Public Script
                            </Text>
                            <Group spacing={5} my="xs">
                                <Badge
                                    color={theme.colors.blue[6]}
                                    variant="filled"
                                    opacity={0.8}
                                    radius="xs"
                                    size="sm"
                                >
                                    {saves} SAVES
                                </Badge>
                            </Group>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
