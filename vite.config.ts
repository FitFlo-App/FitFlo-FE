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
    chunkSizeWarningLimit: 2000, // Increase the warning limit as we're bundling more in one chunk
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
          // Create a single vendor chunk for React and all major libraries to avoid context issues
          if (
            id.includes("node_modules/") && (
              // React and React-related libraries
              id.includes("react") ||
              id.includes("@heroui") ||
              id.includes("@radix-ui") ||
              id.includes("class-variance-authority") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("tailwind-variants") ||
              // Major libraries that might use React context
              id.includes("antd") ||
              id.includes("@ant-design") ||
              id.includes("@xyflow") ||
              id.includes("recharts") ||
              id.includes("framer-motion")
            )
          ) {
            return "vendor-bundle";
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
