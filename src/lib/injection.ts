import { Command } from "@tauri-apps/api/shell";
import { authStore } from "../store/auth";
import { invoke } from "@tauri-apps/api/tauri";

interface GetProcessesResult {
    pid?: number;
    command?: string;
    arguments: string[];
}

function removeCodesign() {
    try {
        new Command("/usr/bin/codesign", [
            "--remove-signature",
            "/Applications/Roblox.app/Contents/MacOS/RobloxPlayer",
        ]);
        new Command("/usr/bin/codesign", [
            "--remove-signature",
            "/Applications/Roblox.app/Contents/MacOS/Roblox.app/Contents/MacOS/Roblox",
        ]);
        new Command("/usr/bin/codesign", [
            "--remove-signature",
            "/Applications/Roblox.app/Contents/MacOS/Roblox.app/Contents/MacOS/Roblox",
        ]);
    } catch (error) {
        console.error(`Failed to remove codesign: ${error}`);
    }
}

function spawnRoblox(args: string) {
    console.log("Spawning Roblox with args", args);
    console.log("zsh", [
        "-c",
        `"/Applications/Roblox.app/Contents/MacOS/RobloxPlayer" "${args}"`,
    ]);
    const command = new Command("sh", [
        "-c",
        `"/Applications/Roblox.app/Contents/MacOS/RobloxPlayer" "${args}"`,
    ]);
    command.on("close", (code) => {
        console.log("Closed with code", code);
    });

    command.on("error", (error) => {
        console.log("Error", error);
    });

    command.stdout.on("data", (data) => {
        console.log("stdout", data.toString());
    });

    command.stderr.on("data", (data) => {
        console.log("stderr", data.toString());
    });

    command.spawn();
}

function killProcess(pid: number) {
    new Command("kill", ["-9", pid.toString()]).spawn();
}

export async function inject() {
    const { authToken } = authStore.getState();

    if (!authToken) {
        throw new Error("You are not logged in!");
    }

    const processes = await getRobloxProcesses();
    let process: GetProcessesResult | null = processes[0];

    if (!process) {
        while (!process) {
            console.log("Waiting for Roblox to start...");
            process = (await getRobloxProcesses())[0];

            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        console.log("Roblox started!");
        console.log(process);

        killProcess(process.pid!);

        console.log("Killed Roblox!");

        await invoke("try_inject", {
            pid: process.pid,
            args: process.arguments.slice(1),
        });
    }

    console.log("Roblox is already running!");
}

export function downloadFile(options: { url: string; destination: string }) {
    return invoke("download-file", options);
}

export async function getRobloxProcesses(): Promise<GetProcessesResult[]> {
    return invoke("get_processes");
}
