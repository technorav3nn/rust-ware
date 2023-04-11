import { Command } from "@tauri-apps/api/shell";
import { authStore } from "../store/auth";
import { invoke } from "@tauri-apps/api/tauri";
import { GetProcessesResult } from "./util/process";

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
    console.log("[spawnRoblox] Spawning roblox.");

    const command = new Command("sh", [
        "-c",
        `"/Applications/Roblox.app/Contents/MacOS/RobloxPlayer" "${args}"`,
    ]);

    command.on("close", (code) => {
        console.log("[spawnRoblox] Roblox Closed with code", code);
    });

    command.on("error", (error) => {
        console.log("[spawnRoblox] Stderr Error", error);
    });

    return command.spawn();
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

        console.log("[injection] Roblox started!");

        killProcess(process.pid!);

        console.log("[injection] Killed Roblox!");

        await invoke("try_inject", {
            pid: process.pid,
            args: process.arguments.slice(1),
        });
    }

    console.warn("[injection] Roblox is already running!");
}

export function downloadFile(options: { url: string; destination: string }) {
    return invoke("download-file", options);
}

export async function getRobloxProcesses(): Promise<GetProcessesResult[]> {
    return invoke("get_processes");
}
