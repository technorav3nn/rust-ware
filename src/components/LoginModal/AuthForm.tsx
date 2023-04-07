import { Group, TextInput, PasswordInput, Button, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { useAuthStore } from "../../store/auth";
import { closeAllModals } from "@mantine/modals";
import { invoke } from "@tauri-apps/api/tauri";
import { useRouter } from "next/router";
import { useState } from "react";

export function AuthForm() {
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },
    });
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async ({ username, password }: typeof form.values) => {
        if (useAuthStore.getState().authToken) {
            console.error("Already authenticated");
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

            router.push("/");
        } catch (error) {
            console.error(error);
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
