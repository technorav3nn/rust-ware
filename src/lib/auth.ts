import { invoke } from "@tauri-apps/api";
import { useGlobalStore } from "./state";

export async function login(username: string, password: string) {
    let token = await invoke<string>("authenticate", {
        username,
        password,
    });

    useGlobalStore.getState().setAuthToken(token);
}
