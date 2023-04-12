import { MdCode, MdTerminal, MdDescription, MdSettings } from "react-icons/md";
import { HiPlay } from "react-icons/hi2";

const actions = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute: (_e: React.MouseEvent) => {
        console.log("Execute");
    },
};

export const NAVBAR_TOP_ITEMS = [
    {
        label: "Editor",
        icon: MdCode,
        to: "/",
    },
    {
        label: "Console",
        icon: MdTerminal,
        to: "/console",
    },
    {
        label: "Scripts",
        icon: MdDescription,
        to: "/scripts",
    },
];

export const NAVBAR_BOTTOM_ITEMS = [
    {
        label: "Settings",
        icon: MdSettings,
        to: "/settings",
    },
    { label: "Execute", icon: HiPlay, onClick: actions.execute, iconSize: 28 },
];
