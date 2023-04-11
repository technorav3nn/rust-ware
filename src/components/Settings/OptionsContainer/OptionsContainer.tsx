import { Card, Group, Switch, Text, Divider } from "@mantine/core";
import { useStyles } from "./index.styles";

interface SwitchesCardProps {
    title: string;
    description: string;
    data: {
        title: string;
        description: string;
    }[];
    animationDelay?: number;
}

export function SettingsBox({ title, description, data }: SwitchesCardProps) {
    const { classes } = useStyles();

    const items = data.map((item, i) => (
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
                key={i}
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
