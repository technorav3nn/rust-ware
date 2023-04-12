import { Command } from "@tauri-apps/api/shell";
import { invoke } from "@tauri-apps/api/tauri";
import { authStore } from "../store/auth";
import { GetProcessesResult } from "./util/process";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function removeCodesign() {
    try {
        const signRemoveRobloxPlayer = new Command("/usr/bin/codesign", [
            "--remove-signature",
            "/Applications/Roblox.app/Contents/MacOS/RobloxPlayer",
        ]);
        signRemoveRobloxPlayer.spawn();

        const signRemoveRoblox = new Command("/usr/bin/codesign", [
            "--remove-signature",
            "/Applications/Roblox.app/Contents/MacOS/Roblox.app/Contents/MacOS/Roblox",
        ]);
        signRemoveRoblox.spawn();

        const signRemoveRobloxSecond = new Command("/usr/bin/codesign", [
            "--remove-signature",
            "/Applications/Roblox.app/Contents/MacOS/Roblox.app/Contents/MacOS/Roblox",
        ]);
        signRemoveRobloxSecond.spawn();
    } catch (error) {
        console.error(`Failed to remove codesign: ${error}`);
    }
}

function killProcess(pid: number) {
    new Command("kill", ["-9", pid.toString()]).spawn();
}

export async function getRobloxProcesses(): Promise<GetProcessesResult[]> {
    return invoke("get_processes");
}

export function downloadFile(options: { url: string; destination: string }) {
    return invoke("download-file", options);
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
            // eslint-disable-next-line no-await-in-loop
            [process] = await getRobloxProcesses();

            // eslint-disable-next-line no-promise-executor-return, no-await-in-loop
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
