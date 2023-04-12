import { useState } from "react";
import { ScriptLibraryTab } from "../components/Scripts/ScriptLibrary/ScriptLibraryTab";
import { StyledSegmentedControl } from "../components/Styled/SegmentedControl/SegmentedControl";

function Scripts() {
    const [tab, setTab] = useState("library");

    return (
        <>
            <StyledSegmentedControl
                data={[
                    { label: "Library", value: "library" },
                    { label: "Saved Scripts", value: "saved-scripts" },
                ]}
                onChange={setTab}
                mt="sm"
                color="blue"
                value={tab}
            />
            <br />
            {tab === "library" && <ScriptLibraryTab />}
            {tab === "saved-scripts" && "Sex"}
        </>
    );
}

export default Scripts;
