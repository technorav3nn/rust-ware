import { Button, Container } from "@mantine/core";
import { AuthLayout } from "../views/AuthPage";
import { useAuthStore } from "../store/auth";

function Index() {
    return (
        <Container>
            <h1>Waiting for authentication to be complete...</h1>
        </Container>
    );
}

function App() {
    const authStore = useAuthStore();

    return (
        <>
            <AuthLayout />
            <Index />
        </>
    );
}

export default App;
