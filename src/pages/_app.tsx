import "nprogress/nprogress.css";
import "../styles/global.css";

import NProgress from "nprogress";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import { AppNavbar } from "../views/AppLayout";
import dynamic from "next/dynamic";
import { ModalsProvider } from "@mantine/modals";
import { PageContainer } from "../components/Layout/PageContainer";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth";

const ANIMATION_VARIANTS = {
    hidden: { opacity: 0, x: 0, y: -30 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 30 },
};

function App(props: AppProps) {
    const { Component, pageProps, router } = props;

    useEffect(() => {
        router.events.on("routeChangeStart", () => NProgress.start());
        router.events.on("routeChangeComplete", () => NProgress.done());
        router.events.on("routeChangeError", () => NProgress.done());
    });

    useEffect(() => {
        if (!useAuthStore.getState().authToken && router.pathname !== "/auth") {
            router.push("/auth");
        }
    }, []);

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

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
                    primaryShade: 9,
                }}
            >
                <ModalsProvider>
                    <AppShell className="fixHeader" navbar={<AppNavbar />}>
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                            onExitComplete={() => window.scrollTo(0, 0)}
                        >
                            <motion.main
                                layoutId="main"
                                key={router.route}
                                initial="hidden"
                                layout="position"
                                animate="enter"
                                exit="exit"
                                variants={ANIMATION_VARIANTS}
                                transition={{
                                    duration: 0.2,
                                    type: "easeInOut",
                                }}
                                onAnimationComplete={() =>
                                    window.scrollTo(0, 0)
                                }
                            >
                                <Component {...pageProps} />
                            </motion.main>
                        </AnimatePresence>
                    </AppShell>
                </ModalsProvider>
            </MantineProvider>
        </>
    );
}

export default dynamic(() => Promise.resolve(App), {
    ssr: false,
});
