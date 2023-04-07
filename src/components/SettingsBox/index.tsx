import {
    createStyles,
    Card,
    Group,
    Switch,
    Text,
    Divider,
} from "@mantine/core";

// This is a helper function to convert pixels to rem
function rem(px: number) {
    return `${px / 16}rem`;
}

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.fn.lighten("gray", 0.11),
    },

    item: {
        "& + &": {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },
    },

    switch: {
        "& *": {
            cursor: "pointer",
        },
    },

    title: {
        lineHeight: 1,
    },
}));

interface SwitchesCardProps {
    title: string;
    description: string;
    data: {
        title: string;
        description: string;
    }[];
}

export function SettingsBox({ title, description, data }: SwitchesCardProps) {
    const { classes } = useStyles();

    const items = data.map((item) => (
        <Group position="apart" className={classes.item} noWrap spacing="xl">
            <div>
                <Text sx={{ fontWeight: 700 }}>{item.title}</Text>
                <Text size="xs" color="dimmed">
                    {item.description}
                </Text>
            </div>
            <Switch
                onLabel="ON"
                offLabel="OFF"
                className={classes.switch}
                size="lg"
            />
        </Group>
    ));

    return (
        <Card withBorder radius="md" p="xl" className={classes.card}>
            <Text fz="lg" className={classes.title} fw={800}>
                {title}
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
                {description}
                <Divider mt={10} />
            </Text>
            {items}
        </Card>
    );
}
