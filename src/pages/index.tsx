import { useEffect, useRef, WheelEvent } from "react";
import { CodeEditor } from "../components/Editor/CodeEditor";
import { TabContainer } from "../components/Editor/Tabs/TabContainer";
import { Tab } from "../components/Editor/Tabs/Tab";
import { useTabStore } from "../store/tabs";

function Index() {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const tabStore = useTabStore();

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

    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (tabStore.tabs.length === 0) {
            tabStore.addTab({
                identifier: "first",
                title: "First tab",
                editorText: "print('Hello world!')",
            });
            tabStore.setActiveTab("first");
            console.log(useTabStore.getState().activeTab);
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <TabContainer>
                {tabStore.tabs.map((tab) => (
                    <Tab
                        identifier={tab.identifier}
                        title={tab.title}
                        //setActive={(identifier) =>
                        //    tabStore.setActiveTab(identifier)
                        //}
                    />
                ))}
            </TabContainer>

            <CodeEditor />
        </>
    );
}

export default Index;
