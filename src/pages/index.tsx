import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { AuthForm } from "../components/LoginModal/AuthForm";

function App() {
    const [modalOpened, { open, close }] = useDisclosure(true, {
        onClose: () => console.log("Modal closed"),
    });

    const onSubmit = (username: string, password: string) => {
        console.log("Form submitted: ", username, password);
        close();
    };

    useEffect(() => {
        setTimeout(() => open());
    }, []);

    return (
        <>
            <Modal
                opened={modalOpened}
                onClose={close}
                title="Authentication"
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                centered
                exitTransitionDuration={1000}
            >
                <AuthForm close={close} onSubmit={onSubmit} />
            </Modal>
        </>
    );
}

export default App;
