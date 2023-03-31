import { create } from "zustand";

interface GlobalState {
    authToken: string | null;
    setAuthToken: (token: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    authToken: null,
    setAuthToken: (token: string) => set({ authToken: token }),
}));

export const globalStore = useGlobalStore;
