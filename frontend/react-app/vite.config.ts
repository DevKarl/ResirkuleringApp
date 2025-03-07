import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "../../src/main/resources/static", // Path to your Spring Boot static directory
    assetsDir: "", // Keeps everything flat, avoids unnecessary subfolders
    rollupOptions: {
      output: {
        // Removes hashed file names
        entryFileNames: "index.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
      },
    },
  },
  base: "./", // Adjust base URL if needed
});
