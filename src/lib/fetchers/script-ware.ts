import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/auth";
import { SW_API_BASE_URL } from "../util/constants";

export async function scriptWareFetch<T extends string>(
    url: `${typeof SW_API_BASE_URL}${T}`,
    options: RequestInit = {}
) {
    const { authToken } = authStore.getState();
    if (!authToken) {
        throw new Error("[scriptWareFetch] No auth token found!");
    }

    const res = await fetch(url, {
        ...options,
        body: authToken,
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });

    if (!res.ok && res.status === 429) {
        wait(500);
        const navigate = useNavigate();
        navigate("/auth");

        return;
    }

    return res;
}

export const wait = async (ms: number) =>
    await new Promise((r) => setTimeout(r, ms));
