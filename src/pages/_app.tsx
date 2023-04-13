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
import { Notifications } from "@mantine/notifications";
import { Navbar } from "../components/Layout/Navbar/Navbar";
import { useAuthStore } from "../store/auth";

const theme: MantineThemeOverride = {
    globalStyles: () => ({
        body: {
            backgroundColor: "transparent",
        },
    }),
    components: {
        Button: {},
    },
    colorScheme: "dark",
    primaryShade: 7,
};

const appShellEditorPage = {
    main: {
        paddingBottom: "0px",
        paddingTop: "0px",
        paddingRight: "0px",
        paddingLeft: "calc(var(--mantine-navbar-width, 0px))",
    },
};

const appShellGlobal = {};

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

        const appshellMain: HTMLDivElement | null = document.querySelector(
            ".mantine-AppShell-main"
        );
        if (appshellMain) {
            appshellMain.setAttribute("data-tauri-drag-region", "");
        }
    }, []);

    return (
        <Providers>
            <AppShell
                navbar={<Navbar data-tauri-drag-region />}
                data-tauri-drag-region
                styles={{
                    root:
                        location.pathname === "/"
                            ? appShellEditorPage
                            : appShellGlobal,
                }}
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
