import { Command } from "@tauri-apps/api/shell";
import { invoke } from "@tauri-apps/api/tauri";

export interface GetProcessesResult {
    pid?: number;
    command?: string;
    arguments: string[];
}

export function killProcess(pid: number) {
    new Command("kill", ["-9", pid.toString()]).spawn();
}

export async function getRobloxProcesses(): Promise<GetProcessesResult[]> {
    return invoke("get_processes");
}
