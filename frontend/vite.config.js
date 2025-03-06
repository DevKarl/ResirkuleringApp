import { defineConfig } from "vite";

export default defineConfig({
  root: '.', // Root of the frontend project
  base: '/', // Public path for the assets
  //publicDir: "public", // copies html to same outDir
  build: {
    outDir: '../src/main/resources/static', // Output to Spring Boot's static folder
    emptyOutDir: true, // Clear output folder before writing new files
    rollupOptions: {
      //input: 'public/index.html',
      output: {
        entryFileNames: 'index.js', // Main JS file directly in root
        chunkFileNames: '[name].js', // Optional: Chunk files directly in root
        assetFileNames: '[name][extname]' // Optional: Other assets directly in root
      }
    }
  }
});
