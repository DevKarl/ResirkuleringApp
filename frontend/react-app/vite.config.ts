import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "../../backend/src/main/resources/static",
  },
  base: "./",
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
