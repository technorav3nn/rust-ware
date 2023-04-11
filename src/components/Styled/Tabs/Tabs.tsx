import { TabsProps, Tabs } from "@mantine/core";
import { sxStyles } from "./index.styles";

export function StyledTabs(props: TabsProps) {
    return <Tabs unstyled sx={sxStyles} {...props} />;
}
