import { Box, ScrollArea, Tabs } from "@mantine/core";
import { useEffect, useRef } from "react";
import { IconPlus } from "@tabler/icons-react";
import uniqueId from "lodash/uniqueId";
import { useTabStore } from "../../../store/tabs";
import { C } from "@tauri-apps/api/shell-cbf4da8b";

export function TabContainer({ children }: { children: React.ReactNode }) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const tabStore = useTabStore();

    useEffect(() => {}, [tabStore.tabs]);

    const onTabAdd = () => {
        const uuid = uniqueId();
        tabStore.addTab({
            identifier: `new-${uuid}`,
            title: `New tab ${uuid}`,
            editorText: `print('Hello world! But this is a new tab! ${uuid}')`,
        });
    };

    const onTabChange = (identifier: string) => {
        if (identifier === "tab-add") return;
        tabStore.setActiveTab(identifier);
    };

    return (
        <Box sx={{ overflow: "hidden" }}>
            <ScrollArea viewportRef={scrollAreaRef} type="never">
                <Tabs
                    defaultValue="first"
                    styles={{
                        tabLabel: {
                            whiteSpace: "nowrap",
                        },
                        tabsList: {
                            flexWrap: "nowrap",
                        },
                        root: {
                            overflow: "hidden",
                        },
                        tab: {
                            // add button
                            "&:last-of-type": {
                                "&[data-active]": {
                                    borderColor: "transparent",
                                },
                            },
                        },
                    }}
                    color="blue"
                    mb={0}
                    radius="0"
                    onTabChange={onTabChange}
                    value={tabStore.activeTab?.identifier}
                >
                    <Tabs.List>
                        {children}
                        <Tabs.Tab
                            icon={<IconPlus size="1.4rem" />}
                            value="tab-add"
                            sx={(theme) => ({
                                borderBottom: theme.colors.gray[1],
                            })}
                            onClick={onTabAdd}
                        />
                    </Tabs.List>
                </Tabs>
            </ScrollArea>
        </Box>
    );
}
