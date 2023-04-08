import { Container } from "@mantine/core";
import { useEffect } from "react";
import { openModal } from "@mantine/modals";
import { AuthForm } from "../components/LoginModal/AuthForm";

function Index() {
    return (
        <Container>
            <h1>Waiting for authentication to be complete...</h1>
        </Container>
    );
}

function AuthLayout() {
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
            <AuthLayout />
            <Index />
        </>
    );
}

export default App;
