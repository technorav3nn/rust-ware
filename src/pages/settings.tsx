import { Container } from "../components/Layout/Container";
import { SettingsBox } from "../components/Settings/OptionsContainer/OptionsContainer";

function Settings() {
    return (
        <Container>
            <SettingsBox
                title={"Settings"}
                description={"Script-Ware M Settings"}
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
        </Container>
    );
}

export default Settings;
