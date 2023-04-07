import {
    Stack,
    TextInput,
    useMantineTheme,
    Box,
    SimpleGrid,
    Skeleton,
} from "@mantine/core";
import { useDebouncedState, useElementSize } from "@mantine/hooks";
import { ScriptLibraryScripts, searchScript } from "../lib/script-library";
import useAsyncEffect from "use-async-effect";
import { ScriptListItem } from "../components/Scripts/ScriptListItem";
import { useState } from "react";
import Image from "next/image";

function Scripts() {
    const theme = useMantineTheme();
    const { width } = useElementSize();

    const [query, setQuery] = useDebouncedState("", 500);
    const [error, setError] = useState<string | false>(false);

    const [loading, setLoading] = useState(false);
    const [scripts, setScripts] = useState<ScriptLibraryScripts[]>([]);

    useAsyncEffect(async () => {
        setScripts([]);
        if (query.length < 3) return;
        setLoading(true);

        try {
            const result = await searchScript(query);
            console.log(result);

            if (!result) {
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
                            background: theme.fn.lighten("gray", 0.1),
                        },
                    }}
                    pb="sm"
                />
            </Stack>
            <SimpleGrid
                cols={3}
                spacing="md"
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
                {query == "" && " Pleae enter a search query"}
                {loading &&
                    Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} height="250px" />
                    ))}
                {scripts.length !== 0 && (
                    <>
                        {scripts.map((script) => (
                            <ScriptListItem
                                image={script.thumbnail}
                                title={script.name}
                                author={script.created_by ?? "Unknown"}
                                saves={script.saves}
                            />
                        ))}
                    </>
                )}
            </SimpleGrid>
        </Box>
    );
}

export default Scripts;
