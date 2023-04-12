import { Box, ScrollArea, Tabs } from "@mantine/core";
import { useRef } from "react";

export function TabContainer({ children }: { children: React.ReactNode }) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

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
                    }}
                    color="blue"
                    mb={10}
                    radius="0"
                >
                    <Tabs.List>{children}</Tabs.List>
                </Tabs>
            </ScrollArea>
        </Box>
    );
}
