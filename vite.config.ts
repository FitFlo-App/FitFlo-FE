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
      // Make sure React is externalized and loaded before any other scripts
      external: [],
      output: {
        // Ensure proper loading order
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        // Bundle React with UI components to avoid context errors
        manualChunks: (id) => {
          // Create a vendor chunk that includes React and all React-dependent libraries
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/react-router-dom") ||
            id.includes("node_modules/@heroui") ||
            id.includes("node_modules/@radix-ui") ||
            id.includes("node_modules/class-variance-authority") ||
            id.includes("node_modules/clsx") ||
            id.includes("node_modules/tailwind-merge") ||
            id.includes("node_modules/tailwind-variants")
          ) {
            return "vendor-react-ui";
          }
          
          // Other major libraries
          if (
            id.includes("node_modules/antd") ||
            id.includes("node_modules/@ant-design") ||
            id.includes("node_modules/@xyflow") ||
            id.includes("node_modules/openai") ||
            id.includes("node_modules/recharts")
          ) {
            return "vendor-libs";
          }
          
          // Other dependencies
          if (id.includes("node_modules/")) {
            return "vendor-other";
          }
          
          // App code
          return "app";
        },
      },
    },
  },
  // Ensure base path is set correctly for production
  base: "/",
});
