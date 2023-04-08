import { PageContainer } from "../components/Layout/PageContainer";
import { SettingsBox } from "../components/SettingsBox";

function Settings() {
    return (
        <PageContainer>
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
        </PageContainer>
    );
}

export default Settings;
