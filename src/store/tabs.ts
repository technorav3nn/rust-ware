import { create } from "zustand";

interface Tab {
    identifier: string;
    title: string;
    editorText: string;
}

interface TabsState {
    activeTab: Tab | null;
    tabs: Tab[];
    setActiveTab: (identifier: string) => void;
    closeTab: (tab: Tab) => void;
    addTab: (tab: Tab) => void;
    setTabEditorText: (identifier: string, editorText: string) => void;
}

export const useTabStore = create<TabsState>((set, get) => ({
    activeTab: null,
    tabs: [],
    setActiveTab: (identifier: string) => {
        const { tabs } = get();
        const foundTab = tabs.find((tab) => tab.identifier === identifier);

        if (!foundTab) {
            throw new Error(`Tab ${identifier} not found`);
        }

        set({ activeTab: foundTab });
    },
    closeTab: (tab: Tab) => {
        const { tabs } = get();
        const foundTab = tabs.find((t) => t.identifier === tab.identifier);

        if (!foundTab) {
            throw new Error(`Tab ${tab} not found`);
        }

        set((state) => ({
            tabs: state.tabs.filter((t) => t.identifier !== tab.identifier),
        }));
    },
    addTab: (tab: Tab) => {
        const { tabs } = get();
        const foundTab = tabs.find((t) => t.identifier === tab.identifier);

        if (foundTab) {
            throw new Error(`Tab ${tab} already exists`);
        }

        set((state) => ({
            tabs: [...state.tabs, tab],
        }));
    },
    setTabEditorText: (identifier: string, editorText: string) => {
        const { tabs } = get();
        const foundTab = tabs.find((tab) => tab.identifier === identifier);

        if (!foundTab) {
            throw new Error(`Tab ${identifier} not found`);
        }

        set((state) => ({
            tabs: state.tabs.map((tab) => {
                if (tab.identifier === identifier) {
                    return {
                        ...tab,
                        editorText,
                    };
                }

                return tab;
            }),
        }));
    },
}));

export function findTab(identifier: string) {
    const { tabs } = useTabStore.getState();
    return tabs.find((tab) => tab.identifier === identifier);
}
