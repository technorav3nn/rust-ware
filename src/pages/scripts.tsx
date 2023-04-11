import { Center } from "@mantine/core";
import { useState } from "react";
import ScriptLibraryTab from "../components/Scripts/ScriptLibrary/ScriptLibraryTab";
import { StyledSegmentedControl } from "../components/Styled/SegmentedControl/SegmentedControl";
import { AnimatePresence, motion } from "framer-motion";

function Scripts() {
    const [tab, setTab] = useState("library");

    return (
        <>
            <Center>
                <StyledSegmentedControl
                    data={[
                        { label: "Library", value: "library" },
                        { label: "Saved Scripts", value: "saved-scripts" },
                    ]}
                    onChange={setTab}
                    mt={"sm"}
                    color="blue"
                    value={tab}
                />
            </Center>
            {tab === "library" && <ScriptLibraryTab />}
            {tab === "saved-scripts" && "Sex"}
        </>
    );
}

export default Scripts;
