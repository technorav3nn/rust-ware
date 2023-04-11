import { Container as MantineContainer, SpacingValue } from "@mantine/core";

export function Container({
    children,
    my,
}: {
    children: React.ReactNode;
    my?: SpacingValue;
}) {
    return (
        <MantineContainer data-tauri-drag-region my={my ?? "md"}>
            {children}
        </MantineContainer>
    );
}
