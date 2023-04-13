import {
    Stack,
    TextInput,
    useMantineTheme,
    Box,
    SimpleGrid,
    Skeleton,
    Alert,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import useAsyncEffect from "use-async-effect";
import { useState } from "react";
import { stagger } from "framer-motion";
import { IconAlertCircle } from "@tabler/icons-react";
import { ScriptListItem } from "./ScriptSearchCard/ScriptSearchCard";
import { ScriptLibraryScript, searchScript } from "../../../lib/script-library";

const ErrorNotification = ({ text }: { text: string }) => (
    <Alert
        icon={<IconAlertCircle size="1rem" />}
        title={text}
        styles={{
            root: {
                paddingBottom: "2px",
            },
        }}
        color="red"
    >
        <></>
    </Alert>
);

export function ScriptLibraryTab() {
    const theme = useMantineTheme();

    const [query, setQuery] = useDebouncedState("", 500);
    const [error, setError] = useState<string | null>();

    const [loading, setLoading] = useState(false);
    const [scripts, setScripts] = useState<ScriptLibraryScript[]>([]);

    const staggerDelay = stagger(0.2, { startDelay: 0.2 });

    // eslint-disable-next-line consistent-return
    useAsyncEffect(async () => {
        setScripts([]);
        if (query.length < 3) {
            return setError("Please enter more than 3 characters");
        }

        setError(null);

        setLoading(true);

        try {
            const result = await searchScript(query);
            console.log(result);

            if (!result) {
                // eslint-disable-next-line consistent-return
                return setError("Failed to load scripts");
            }

            setLoading(false);
            setScripts(result);
        } catch (e) {
            setError("Failed to load scripts");
        }
    }, [query]);

    return (
        <Box m="md">
            <Stack sx={{ height: "100%" }}>
                <TextInput
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    defaultValue={query}
                    styles={{
                        input: {
                            background:
                                theme.colorScheme === "dark"
                                    ? theme.fn.lighten("gray", 0.1)
                                    : theme.colors.gray[1],
                        },
                    }}
                    pb="sm"
                />
            </Stack>
            <SimpleGrid
                cols={3}
                spacing="md"
                breakpoints={[
                    { maxWidth: "sm", cols: 1 },
                    { maxWidth: "md", cols: 2 },
                    { minWidth: "xl", cols: 4 },
                    { maxWidth: "lg", cols: 3 },
                ]}
            >
                {query.trim() === "" && (
                    <ErrorNotification text="Please enter a search query!" />
                )}
                {loading &&
                    Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} height="250px" />
                    ))}
                {error && <ErrorNotification text={error} />}
                {scripts.length !== 0 && (
                    <>
                        {scripts.map((script, i) => (
                            <ScriptListItem
                                image={script.thumbnail}
                                title={script.name}
                                saves={script.saves}
                                animationDelay={staggerDelay(i, scripts.length)}
                            />
                        ))}
                    </>
                )}
            </SimpleGrid>
        </Box>
    );
}
