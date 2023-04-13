import { Editor, OnChange, OnMount } from "@monaco-editor/react";
import { useMantineTheme } from "@mantine/core";
import { useTabStore } from "../../store/tabs";
import { setupTheme } from "../../lib/setup/editor";

export function CodeEditor() {
    const theme = useMantineTheme();

    const tabStore = useTabStore();

    const onEditorMount: OnMount = (editor, monaco) => {
        setupTheme(theme, monaco);
        monaco.editor.setTheme("defaultTheme");
    };

    const onEditorChange: OnChange = (value) => {
        if (!tabStore.activeTab?.editorText) {
            console.error("[CodeEditor] No active tab");
        }
        if (!value) console.error("[CodeEditor] No value");

        tabStore.setTabEditorText(tabStore.activeTab!.identifier, value ?? "");
    };

    return (
        <Editor
            language="lua"
            theme="vs-dark"
            height="90vh"
            onMount={onEditorMount}
            options={{
                fontSize: 15.2,
                automaticLayout: true,
                // TODO: Add this font to the project,(some people might not have it installed)
                fontFamily: "Jetbrains Mono",
            }}
            value={
                tabStore.activeTab?.editorText ??
                "print('Code editor not working')"
            }
            onChange={onEditorChange}
        />
    );
}
