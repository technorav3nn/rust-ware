import { defineConfig } from "vite";

import generouted from "@generouted/react-router/plugin";
import monaco from "vite-plugin-monaco-editor";
import reactswc from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactswc(),
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
