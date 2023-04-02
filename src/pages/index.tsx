import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen, once } from "@tauri-apps/api/event";
import {
    Button,
    Center,
    Container,
    createStyles,
    Group,
    Progress,
    Text,
} from "@mantine/core";
import useAsyncEffect from "use-async-effect";
import { inject } from "../lib/injection";
import { useGlobalStore } from "../lib/state";

const useStyles = createStyles((theme) => ({
    container: {
        paddingTop: "10vh",
    },

    NextInfo: {
        position: "absolute",
        bottom: "10px",
        width: "100%",
    },
}));

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [progress, setProgress] = useState<number | null>(null);

    const [authToken, setAuthToken] = useGlobalStore((state) => [
        state.authToken,
        state.setAuthToken,
    ]);

    const { classes } = useStyles();

    useAsyncEffect(async () => {
        const destroy = await listen<{
            progress: number;
            size: number;
        }>("download_file_loading", (event) => {
            setProgress((event.payload!.progress / event.payload!.size) * 100);
        });

        return () => {
            destroy();
        };
    }, []);

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
    }

    async function testLogin() {
        let token = await invoke<string>("authenticate", {
            username: "DeathBlows",
            password: "lollol123",
        });
        setAuthToken(token);
    }

    async function testDownload() {
        await invoke("download_file", {
            url: "https://script-ware.com/api/serve/beta/libScriptWare.dylib",
            filePath: "/Users/Shared/ScriptWare/libScriptWare.dylib",
            fileNameAlias: "Script-Ware Engine",
        });
    }

    async function getProcesses(): Promise<
        { pid: number; command: string; argumentss: string[] }[]
    > {
        return await invoke("get_processes", {});
    }

    return (
        <>
            <Container className={classes.container}>
                <Group position="center">
                    <Button onClick={() => testLogin()} variant="default">
                        Login lol
                    </Button>
                    <Button onClick={() => testDownload()} variant="default">
                        Download lol
                    </Button>
                    <Button
                        onClick={() =>
                            getProcesses().then((res) => console.log(res))
                        }
                        variant="default"
                    >
                        Get Processes
                    </Button>
                    <Button onClick={() => inject()} variant="default">
                        Inject test {authToken}
                    </Button>
                    <br />
                </Group>

                <Progress size="lg" value={progress ?? 0}></Progress>
                <Text>{greetMsg}</Text>
            </Container>
            <Text align="center" className={classes.NextInfo}>
                The frontend is powered with{" "}
                <a href="https://nextjs.org" target="_blank">
                    Next.js
                </a>
            </Text>
        </>
    );
}

export default App;
