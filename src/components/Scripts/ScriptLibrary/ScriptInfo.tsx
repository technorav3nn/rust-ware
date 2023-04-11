import {
    AspectRatio,
    BackgroundImage,
    Badge,
    Button,
    Group,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

interface ScriptModalProps {
    image: string;
    title: string;
    author: string;
    saves: number;
}

export function ScriptModal({ image, title, author, saves }: ScriptModalProps) {
    const theme = useMantineTheme();

    const handleTogglePlayed = async () => {
        console.log("toggle played");
    };

    return (
        <Stack
            spacing={0}
            sx={{
                width: "unset",
                height: "80%",
            }}
        >
            <Group noWrap align="stretch" spacing="lg">
                <Stack>
                    <AspectRatio ratio={3 / 4} sx={{ width: 200 }}>
                        <BackgroundImage
                            src={image}
                            radius="md"
                            sx={{
                                borderWidth: 1,
                                borderColor: theme.colors.gray[8],
                                borderStyle: "solid",
                            }}
                        />
                    </AspectRatio>
                    <Button
                        radius="md"
                        leftIcon={<IconDownload size={18} />}
                        onClick={handleTogglePlayed}
                    >
                        Save Script
                    </Button>
                </Stack>

                <Stack justify="space-between" sx={{ overflow: "hidden" }}>
                    <Stack spacing={0}>
                        <Group align="end" spacing={4} noWrap>
                            <Title lineClamp={1}>{title}</Title>
                        </Group>
                        <Group spacing={4}>
                            <Badge color="blue">{saves} SAVES</Badge>
                        </Group>
                        <Text fz="sm" color="dimmed" mt="md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed euismod, nisl nec tincidunt lacinia, est
                            nisl aliquam nisl, eget aliquam nisl nisl sit amet
                        </Text>
                    </Stack>
                </Stack>
            </Group>
        </Stack>
    );
}
