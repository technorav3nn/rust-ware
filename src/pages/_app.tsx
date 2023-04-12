import "nprogress/nprogress.css";

import {
    AppShell,
    Center,
    Loader,
    MantineProvider,
    MantineThemeOverride,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Layout/Navbar/Navbar";
import { useAuthStore } from "../store/auth";
import { Notifications } from "@mantine/notifications";

const theme: MantineThemeOverride = {
    globalStyles: (_theme) => ({
        body: {
            backgroundColor: "transparent",
        },
    }),
    black: "#00000000",
    components: {
        Button: {},
    },
    colorScheme: "dark",
    primaryShade: 7,
};

const Providers = ({ children }: { children: React.ReactNode }) => (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
);

const Loading = () => (
    <Center sx={{ width: "100%", height: "100%" }}>
        <Loader />
    </Center>
);

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (
            !useAuthStore.getState().authToken &&
            location.pathname !== "/auth"
        ) {
            navigate("/auth");
        }

        document
            .querySelector(".mantine-AppShell-main")
            ?.setAttribute("data-tauri-drag-region", "");
    }, []);

    return (
        <Providers>
            <AppShell
                className="fixHeader"
                navbar={<Navbar data-tauri-drag-region />}
                data-tauri-drag-region
            >
                <Notifications />
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </AppShell>
        </Providers>
    );
}

// const ANIMATION_VARIANTS = {
//     hidden: { opacity: 0, x: 0, y: -30 },
//     enter: { opacity: 1, x: 0, y: 0 },
//     exit: { opacity: 0, x: 0, y: 30 },
// };
