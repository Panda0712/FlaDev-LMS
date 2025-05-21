import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// Đọc template HTML tùy chỉnh
const indexHtml = fs.readFileSync("./index-template.html", "utf-8");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    {
      name: "html-transform",
      transformIndexHtml() {
        return indexHtml;
      },
    },
  ],
  base: "/", // Đảm bảo sử dụng đường dẫn tuyệt đối
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets", // Thư mục chứa assets build
    manifest: true, // Tạo file manifest.json
    rollupOptions: {
      output: {
        // Đảm bảo assets sử dụng đường dẫn tuyệt đối
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    // Đảm bảo các đường dẫn trong HTML sử dụng đường dẫn tuyệt đối
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
  },

  // Cấu hình public directory
  publicDir: "public", // 👈 Thư mục public gốc
});
