import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import generouted from "@generouted/react-router/plugin";
import monaco from "vite-plugin-monaco-editor";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        generouted(),
        visualizer({
            filename: "bundle-stats.html",
        }),
        (monaco as any).default({}),
    ],
    build: {
        outDir: "dist",
    },
    resolve: { alias: { "@": "/src" } },
    clearScreen: false,
    server: {
        open: false,
    },
});
