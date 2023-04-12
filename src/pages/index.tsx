import { useEffect, useRef, useState, WheelEvent } from "react";
import { OnMount } from "@monaco-editor/react";
import { CodeEditor } from "../components/Editor/CodeEditor";
import { TabContainer } from "../components/Editor/Tabs/TabContainer";
import { Tab } from "../components/Editor/Tabs/Tab";

const tabs = {
    first: "First taasdfsasdfsdafasdfsadfasdfdsfasdfdafb",
    second: "Second tab",
    third: "Third tab",
    fourth: "Fourth tab",
    fifth: "Fifth tab",
    sixth: "Sixth tab",
    seventh: "Seventh tab",
    eighth: "Eighth tab",
    ninth: "Ninth tab",
    tenth: "Tenth tab",
};

function Index() {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("first");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onMouseWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollBy({
                left: e.deltaY < 0 ? -15 : 15,
                behavior: "smooth",
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onEditorMount: OnMount = (editor, monaco) => {
        // setupTheme(monaco);
        // monaco.editor.setTheme("defaultTheme");
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onTabClose = (e: React.MouseEvent) => {};

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <TabContainer>
                {Object.entries(tabs).map(([identifier, title]) => (
                    <Tab
                        identifier={identifier}
                        title={title}
                        active={activeTab === identifier}
                        setActive={setActiveTab}
                    />
                ))}
            </TabContainer>

            <CodeEditor />
        </>
    );
}

export default Index;
