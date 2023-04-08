import { SW_API_BASE_URL } from "./constants";
import { authFetch } from "./util";

const scriptCache = new Map<string, string>();

export interface ScriptLibraryScripts {
    total_saves: number;
    verified_publisher: boolean;
    saved: boolean;
    thumbnail: string;
    name: string;
    created_by?: string | null;
    description: string;
    id: number;
    user_id: number;
    open_source: 1 | null;
    public: 1 | null;
    publisher_avatar: string;
    likes: number;
    dislikes: number;
    updated_at: string;
    created_at: string;
    rating: number | null;
    category: string;
    saves: number;
}

export interface ScriptLibrarySearchResult {
    success: boolean;
    data: ScriptLibraryScripts[];
}

namespace ScriptLibraryRoutes {
    export const searchScript = (name: string) =>
        `${SW_API_BASE_URL}/getglobalscripts/search/${encodeURIComponent(
            name
        )}` as const;
}

export async function searchScript(
    name: string
): Promise<ScriptLibraryScripts[] | undefined> {
    const url = ScriptLibraryRoutes.searchScript(name);
    console.log(url);

    const response = await authFetch(url);
    if (!response) return;

    return await response.json();
}
