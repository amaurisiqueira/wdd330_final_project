// import { resolve } from "path";
import { defineConfig } from "vite";
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:  "./src/index.html",
        quiz:  "./src/quiz/index.html"
      },
    },
  },
});
