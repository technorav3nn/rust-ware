import { useEffect, useRef, WheelEvent } from "react";
import { useAuthStore } from "../store/auth";
import Editor, { OnMount } from "@monaco-editor/react";
import { Box, ScrollArea, Tabs, useMantineTheme } from "@mantine/core";
import { setupTheme } from "../lib/edtior";

function Index() {
    const authState = useAuthStore();
    const theme = useMantineTheme();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const onMouseWheel = (e: WheelEvent) => {
        if (scrollAreaRef.current) {
            e.preventDefault();

            scrollAreaRef.current.scrollBy({
                left: e.deltaY < 0 ? -15 : 15,
                behavior: "smooth",
            });
        }
    };

    const onEditorMount: OnMount = (editor, monaco) => {
        setupTheme(monaco);
        monaco.editor.setTheme("defaultTheme");
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            {" "}
            <Box sx={{ overflow: "hidden" }} pt={5}>
                <ScrollArea
                    onWheel={(e) => onMouseWheel(e)}
                    viewportRef={scrollAreaRef}
                    type="never"
                >
                    <Tabs
                        defaultValue="first"
                        styles={{
                            tabLabel: {
                                whiteSpace: "nowrap",
                            },
                            tabsList: {
                                flexWrap: "nowrap",
                            },
                            tab: {
                                border: `1px solid ${theme.colors.gray[8]}`,
                            },
                        }}
                        variant="pills"
                        color="blue"
                        mb={10}
                    >
                        <Tabs.List>
                            <Tabs.Tab value="first">First tab</Tabs.Tab>
                            <Tabs.Tab value="second">Second tab</Tabs.Tab>
                            <Tabs.Tab value="third">Third tab</Tabs.Tab>
                            <Tabs.Tab value="4">2b</Tabs.Tab>
                            <Tabs.Tab value="5">Thi234rd tab</Tabs.Tab>
                            <Tabs.Tab value="6">23423 tab</Tabs.Tab>
                            <Tabs.Tab value="7">234 tab</Tabs.Tab>
                            <Tabs.Tab value="8">Thi22rd tab</Tabs.Tab>
                            <Tabs.Tab value="9">11 tab</Tabs.Tab>
                            <Tabs.Tab value="20">55 tab</Tabs.Tab>

                            <Tabs.Tab value="1234">212234 tab</Tabs.Tab>
                            <Tabs.Tab value="2314">1234 tab</Tabs.Tab>
                            <Tabs.Tab value="12312314">Thi213rd tab</Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </ScrollArea>
            </Box>
            <Editor
                language="lua"
                theme="vs-dark"
                height="90vh"
                onMount={onEditorMount}
                options={{
                    fontSize: 12.2,
                }}
            />
        </>
    );
}

export default Index;
