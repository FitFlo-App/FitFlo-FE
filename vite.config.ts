import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: false,
    minify: "terser",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // Ensure React is properly shared across all chunks
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-libs": [
            "@heroui/system",
            "@heroui/react",
            "@heroui/theme",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
            "tailwind-variants",
          ],
          "other-vendors": [
            "antd",
            "@ant-design/icons",
            "@xyflow/react",
            "openai",
            "recharts",
          ],
        },
      },
    },
  },
  // Ensure base path is set correctly for production
  base: "/",
});
