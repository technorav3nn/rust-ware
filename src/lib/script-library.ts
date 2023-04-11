import { scriptWareFetch } from "./fetchers/script-ware";
import { buildSearchScriptRoute } from "./util/routes";

export interface ScriptLibraryScript {
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
    data: ScriptLibraryScript[];
}

export async function searchScript(
    name: string
): Promise<ScriptLibraryScript[] | undefined> {
    const url = buildSearchScriptRoute(name);

    const response = await scriptWareFetch(url);
    if (!response) return;

    return await response.json();
}
