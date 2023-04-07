import {
    IconDownload,
    IconEye,
    IconMessageCircle,
    IconThumbDown,
    IconThumbUp,
} from "@tabler/icons-react";
import { Card, Text, Group, Center, createStyles } from "@mantine/core";

function rem(px: number) {
    return `${px / 16}rem`;
}

const useStyles = createStyles((theme, _params, getRef) => {
    const image = getRef("image");

    return {
        card: {
            position: "relative",
            height: "250px",
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],

            [`&:hover .${image}`]: {
                transform: "scale(1.20) translateZ(0)",
                filter: "blur(1.5px)",
            },
        },

        image: {
            ...theme.fn.cover(),
            ref: image,
            backgroundSize: "cover",
            transition: "transform 500ms ease, 200ms filter ease-in",
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
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            zIndex: 1,
            width: "101%",
            height: "101%",
            ":hover": {
                paddingBottom: "5%",
            },
            transition: "all ease .3s",
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
}

export function ScriptListItem({
    image,
    title,
    author,
    saves,
}: ImageCardProps) {
    const { classes, theme } = useStyles();

    return (
        <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            component="a"
            target="_blank"
            style={{
                cursor: "pointer",
            }}
            radius="md"
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
                    <Text size="lg" className={classes.title} weight={500}>
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
                                <Text size="sm" className={classes.bodyText}>
                                    {saves}
                                </Text>
                            </Center>
                        </Group>
                    </Group>
                </div>
            </div>
        </Card>
    );
}
