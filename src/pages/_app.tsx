import "nprogress/nprogress.css";

import { AppShell, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Navbar } from "../components/Layout/Navbar/Navbar";
import { useAuthStore } from "../store/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ANIMATION_VARIANTS = {
    hidden: { opacity: 0, x: 0, y: -30 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 30 },
};

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
        <>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    globalStyles: (theme) => ({
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
                }}
            >
                <ModalsProvider>
                    <AppShell
                        className="fixHeader"
                        navbar={<Navbar data-tauri-drag-region />}
                        data-tauri-drag-region
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.main
                                layoutId="main"
                                key={location.key}
                                layout="position"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={ANIMATION_VARIANTS}
                                transition={{
                                    duration: 0.2,
                                    type: "easeInOut",
                                }}
                            >
                                <Outlet />
                            </motion.main>
                        </AnimatePresence>
                    </AppShell>
                </ModalsProvider>
            </MantineProvider>
        </>
    );
}
