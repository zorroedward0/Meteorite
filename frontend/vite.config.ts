import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    proxy: { "/api": "http://127.0.0.1:8000" },
  },
  base: command === "build" ? "/static/" : "/",
  build: {
    outDir: "../backend/frontend_build",
    emptyOutDir: true,
  },
}));
