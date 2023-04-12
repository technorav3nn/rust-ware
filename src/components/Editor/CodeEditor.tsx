import { Editor, OnMount } from "@monaco-editor/react";

export function CodeEditor() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onEditorMount: OnMount = (_editor, _monaco) => {
        // setupTheme(monaco);
        // monaco.editor.setTheme("defaultTheme");
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
                fontFamily: "JetBrains Mono",
            }}
        />
    );
}
