import { SW_API_BASE_URL } from "./constants";

export const buildSearchScriptRoute = (name: string) =>
    `${SW_API_BASE_URL}/getglobalscripts/search/${encodeURIComponent(
        name
    )}` as const;
