import Router from "next/router";
import { authStore } from "../store/auth";
import { SW_API_BASE_URL } from "./constants";

/**
 * Fetches the SW API with the auth token automatically added
 * @param url The URL to fetch
 * @param options The options to pass to fetch
 * @returns The response from the SW API
 */
export async function authFetch<T extends string>(
    url: `${typeof SW_API_BASE_URL}${T}`,
    options: RequestInit = {}
) {
    const { authToken } = authStore.getState();
    if (!authToken) {
        throw new Error("No auth token found");
    }
    console.log(authToken);

    const res = await fetch(url, {
        ...options,
        body: authToken,
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });

    if (!res.ok && res.status === 429) {
        // authenticate again
        wait(500);
        Router.push("/auth");
        return;
    }

    return res;
}

export const wait = async (ms: number) =>
    await new Promise((r) => setTimeout(r, ms));
