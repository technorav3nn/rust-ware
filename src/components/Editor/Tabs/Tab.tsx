import { Group, Tabs, Text, createStyles } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    icon: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[5],
        "&:hover": {
            color: theme.colors.blue[5],
        },
    },
}));

interface TabProps {
    identifier: string;
    title: string;
    active: boolean;
    setActive: (identifier: string) => void;
}

export function Tab({ identifier, title, active, setActive }: TabProps) {
    const { classes } = useStyles();

    const onTabClose = () => {
        console.log(`[Tab ${identifier}] Closed`);
    };

    return (
        <Tabs.Tab
            key={identifier}
            value={identifier}
            onClick={() => setActive(identifier)}
            sx={(theme) => ({
                backgroundColor: active ? theme.colors.gray[8] : "transparent",
                verticalAlign: "middle",
                whiteSpace: "nowrap",
            })}
            style={{}}
        >
            <Group noWrap spacing={10} mt={5}>
                <IconX
                    size="1.5rem"
                    className={classes.icon}
                    onClick={onTabClose}
                />
                <Text fz="md">{title}</Text>
            </Group>
        </Tabs.Tab>
    );
}
