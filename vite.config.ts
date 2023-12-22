import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "index",
      fileName: () => "index.js",
      formats: ["iife"],
    }
  },
  define: {
    "process.env.NODE_ENV": `"production"`
  }
});
