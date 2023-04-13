import { Group, Tabs, Text, createStyles } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { findTab, useTabStore } from "../../../store/tabs";

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
    //active: boolean;
    //setActive: (identifier: string) => void;
}

export function Tab({ identifier, title }: TabProps) {
    const { classes } = useStyles();
    const tabStore = useTabStore();
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(tabStore.activeTab?.identifier === identifier);
    }, [tabStore.activeTab]);

    // eslint-disable-next-line consistent-return
    const onTabClose = (e: React.MouseEvent) => {
        // block the tab from switching
        e.stopPropagation();
        console.log(`[Tab ${identifier}] Closed`);
        const tab = findTab(identifier);
        if (!tab) return console.error(`[Tab ${identifier}] Not found`);

        tabStore.closeTab(tab);
        tabStore.setActiveTab(tabStore.tabs[0].identifier);
    };

    return (
        <Tabs.Tab
            key={identifier}
            value={identifier}
            sx={(theme) => ({
                transition: "background-color 100ms ease",
                backgroundColor: active
                    ? theme.fn.variant({ variant: "light", color: "gray" })
                          .background
                    : "transparent",
                verticalAlign: "middle",
                whiteSpace: "nowrap",
                "&:hover": {
                    backgroundColor: active
                        ? theme.fn.variant({ variant: "light", color: "gray" })
                              .background
                        : theme.colors.dark[5],
                },
            })}
            style={{}}
        >
            <Group noWrap spacing={10} mt={5}>
                <Text fz="md" color={active ? "white" : "dimmed"}>
                    {title}
                </Text>
                <IconX
                    size="1.4rem"
                    className={classes.icon}
                    onClick={onTabClose}
                />
            </Group>
        </Tabs.Tab>
    );
}
