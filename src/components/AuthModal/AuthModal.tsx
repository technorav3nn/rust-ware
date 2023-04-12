import { Group, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { closeAllModals } from "@mantine/modals";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export function AuthForm() {
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async ({ username, password }: typeof form.values) => {
        if (useAuthStore.getState().authToken) {
            console.error("[AuthModal] Already authenticated");
            return;
        }

        try {
            setLoading(true);
            const authToken: string = await invoke("authenticate", {
                username,
                password,
            });
            setLoading(false);

            useAuthStore.getState().setAuthToken(authToken);

            closeAllModals();
            navigate("/");
        } catch (error) {
            console.error("[AuthModal]", error);
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                data-autofocus
                required
                placeholder="Your username"
                label="Username"
                {...form.getInputProps("username")}
            />
            <PasswordInput
                mt="md"
                required
                placeholder="Password"
                label="Password"
                icon={<IconLock size={16} stroke={1.5} />}
                {...form.getInputProps("password")}
            />
            <Group position="apart" mt="xl">
                <Button loading={loading} color="blue" type="submit">
                    Login
                </Button>
            </Group>
        </form>
    );
}
