import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create a separate chunk just for React and React DOM
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          
          // UI components that depend on React
          if (id.includes('node_modules/@heroui/') || 
              id.includes('node_modules/@radix-ui/') ||
              id.includes('node_modules/class-variance-authority') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge') ||
              id.includes('node_modules/tailwind-variants')) {
            return 'ui-framework';
          }
          
          // Other major libraries
          if (id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/antd/') ||
              id.includes('node_modules/@ant-design/') ||
              id.includes('node_modules/@xyflow/') ||
              id.includes('node_modules/openai/') ||
              id.includes('node_modules/recharts/')) {
            return 'vendor';
          }
          
          // All other node_modules
          if (id.includes('node_modules/')) {
            return 'dependencies';
          }
        }
      }
    }
  }
})
