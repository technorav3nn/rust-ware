import { useState } from "react";
import { Container } from "../components/Layout/Container";
import { SettingsBox } from "../components/Settings/OptionsContainer/OptionsContainer";
import { StyledSegmentedControl } from "../components/Styled/SegmentedControl/SegmentedControl";

const segmentedControlData = [
    { label: "Main", value: "main" },
    { label: "Scripts", value: "scripts" },
    { label: "Themes", value: "themes" },
    { label: "Plugins", value: "plugins" },
    { label: "Misc", value: "misc" },
];

function MainSettings() {
    return (
        <SettingsBox
            title="Settings"
            description="Script-Ware M Settings"
            data={[
                {
                    title: "Auto Inject",
                    description: "Auto Inject Script-Ware",
                },
                {
                    title: "Auto Inject",
                    description: "Auto Inject Script-Ware",
                },
                {
                    title: "Auto Inject",
                    description: "Auto Inject Script-Ware",
                },
                {
                    title: "Auto Inject",
                    description: "Auto Inject Script-Ware",
                },
            ]}
        />
    );
}

function Settings() {
    const [tab, setTab] = useState("main");

    return (
        <Container>
            <StyledSegmentedControl
                data={segmentedControlData}
                onChange={setTab}
                color="blue"
                value={tab}
                mb="sm"
            />
            <br />
            {tab === "main" && <MainSettings />}
            {tab !== "main" && `${tab} settings`}
        </Container>
    );
}

export default Settings;
