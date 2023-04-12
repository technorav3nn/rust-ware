import { create } from "zustand";

interface GlobalState {
    authToken: string | null;
    authModalLoading: boolean;
    setAuthToken: (token: string) => void;
    setAuthModalLoading: (loading: boolean) => void;
}

export const useAuthStore = create<GlobalState>((set) => ({
    authToken: null,
    setAuthToken: (token: string) => set({ authToken: token }),
    authModalLoading: false,
    setAuthModalLoading: (loading: boolean) =>
        set({ authModalLoading: loading }),
}));

export const authStore = useAuthStore;
