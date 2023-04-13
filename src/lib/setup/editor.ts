import { MantineTheme } from "@mantine/core";
import { Monaco } from "@monaco-editor/react";

export function setupTheme(theme: MantineTheme, monaco: Monaco) {
    monaco.editor.defineTheme("defaultTheme", {
        base: "vs-dark",
        inherit: true,
        colors: {
            "editor.lineHighlightBackground": "#1a1a1a",
        },
        rules: [],
    });

    monaco.editor.setTheme("defaultTheme");
}
