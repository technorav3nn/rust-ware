import { authStore } from "../store/auth";
import { SW_API_BASE_URL } from "./constants";

/**
 * Fetches the SW API with the auth token automatically added
 * @param url The URL to fetch
 * @param options The options to pass to fetch
 * @returns The response from the SW API
 */
export function authFetch<T extends string>(
    url: `${typeof SW_API_BASE_URL}${T}`,
    options: RequestInit = {}
) {
    const { authToken } = authStore.getState();
    if (!authToken) {
        throw new Error("No auth token found");
    }
    console.log(authToken);

    return fetch(url, {
        ...options,
        body: authToken,
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}
