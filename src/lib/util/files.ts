import { invoke } from "@tauri-apps/api/tauri";

export function downloadFile(options: { url: string; destination: string }) {
    return invoke("download-file", options);
}
