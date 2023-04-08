import { Container, SpacingValue } from "@mantine/core";

export function PageContainer({
    children,
    my,
}: {
    children: React.ReactNode;
    my?: SpacingValue;
}) {
    return (
        <Container data-tauri-drag-region my={my ?? "md"}>
            {children}
        </Container>
    );
}
