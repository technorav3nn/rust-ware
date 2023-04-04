import {
    Paper,
    Group,
    TextInput,
    PasswordInput,
    useMantineTheme,
    Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconLock } from "@tabler/icons-react";

interface Props {
    close: () => void;
    onSubmit: (username: string, password: string) => void;
}

export function AuthForm({ close, onSubmit }: Props) {
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },
    });

    const theme = useMantineTheme();

    const handleSubmit = ({ username, password }: typeof form.values) => {
        onSubmit(username, password);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                data-autofocus
                required
                placeholder="Your username"
                label="First name"
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
                <Button color="blue" type="submit">
                    Login
                </Button>
            </Group>
        </form>
    );
}
