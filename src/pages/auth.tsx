import { Container } from "@mantine/core";
import { useEffect } from "react";
import { openModal } from "@mantine/modals";
import { AuthForm } from "../components/AuthModal/AuthModal";

function Auth() {
    const openAuthModal = () => {
        openModal({
            title: "You must be authenticated to continue.",
            withCloseButton: false,
            closeOnClickOutside: false,
            closeOnEscape: false,
            centered: true,
            children: <AuthForm />,
        });
    };

    useEffect(() => {
        openAuthModal();
    }, []);

    return <></>;
}

function App() {
    return (
        <>
            <Auth />
            <Container>
                <h1>Waiting for authentication to be complete...</h1>
            </Container>
        </>
    );
}

export default App;
