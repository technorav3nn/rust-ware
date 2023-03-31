import { Command } from "@tauri-apps/api/shell";
import { globalStore } from "./state";
import { invoke } from "@tauri-apps/api/tauri";

interface GetProcessesResult {
    pid?: number;
    command?: string;
    arguments: string[];
}

export function removeCodesign() {
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

export async function inject() {
    const { authToken } = globalStore.getState();

    if (!authToken) {
        throw new Error("You are not logged in!");
    }

    removeCodesign();
}

export function downloadFile(options: { url: string; destination: string }) {
    return invoke("download-file", options);
}

export async function getRobloxProcesses(): Promise<GetProcessesResult[]> {
    const process = new Command("ps", ["-exo", "pid,args"]);
    let stdout = "";

    process.stdout.on("data", (data: Buffer) => {
        stdout += data.toString();
    });

    await new Promise((resolve, reject) => {
        process.on("close", resolve);
        process.on("error", reject);
    });

    return stdout
        .split("\n")
        .filter(
            (e) =>
                e.includes("RobloxPlayer") &&
                !e.includes("--crashHandler") &&
                (e.includes("-ticket") || e.endsWith("RobloxPlayer"))
        )
        .map((e) => e.split(" "))
        .map((e) => {
            while (isNaN(parseInt(e[0]))) {
                e.shift();
            }
            return e;
        })
        .map((result) => {
            return {
                pid: parseInt(result.shift() ?? "0"),
                command: result.shift(),
                arguments: result,
            };
        });
}
