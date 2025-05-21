import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  base: "/", // <--- Thêm dòng này
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
