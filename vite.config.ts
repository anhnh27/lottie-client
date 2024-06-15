import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import environmentplugin from "vite-plugin-environment";

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));

  return defineConfig({
    plugins: [react(), environmentplugin("all", { loadEnvFiles: true })],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    esbuild: {
      drop:
        process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    },
    server: {
      port: Number.parseInt(process.env.VITE_PORT ?? "3000"),
      open: true,
      hmr: true,
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "index.html"),
          "service-worker": path.resolve(__dirname, "service-worker.ts"),
        },
        output: {
          dir: "dist",
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
  });
};
