import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        cn: "cn.html",
        ko: "ko.html",
        admin: "admin.html",
        pipeline: "pipeline.html",
      },
    },
  },
});
