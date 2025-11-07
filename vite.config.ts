import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  define: {
    global: "globalThis",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React e React DOM em um chunk próprio
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Separar bibliotecas de UI (HeroUI) em um chunk
          'ui-vendor': [
            '@heroui/react',
            '@heroui/alert',
            '@heroui/avatar',
            '@heroui/button',
            '@heroui/checkbox',
            '@heroui/code',
            '@heroui/drawer',
            '@heroui/dropdown',
            '@heroui/input',
            '@heroui/kbd',
            '@heroui/link',
            '@heroui/navbar',
            '@heroui/snippet',
            '@heroui/switch',
            '@heroui/system',
            '@heroui/table',
            '@heroui/theme',
            '@heroui/use-theme',
          ],
          
          // Separar Chart.js e suas dependências
          'chart-vendor': ['chart.js'],
          
          // Separar React Query
          'query-vendor': ['@tanstack/react-query'],
          
          // Separar bibliotecas de formulário
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Separar bibliotecas de mídia e upload
          'media-vendor': [
            'react-dropzone',
            'react-webcam',
            'react-easy-crop',
            '@lottiefiles/dotlottie-react',
          ],
          
          // Separar React Aria (apenas bibliotecas executáveis, não tipos)
          'react-aria-vendor': [
            '@react-aria/visually-hidden',
          ],
          
          // Separar outras bibliotecas grandes e utilitárias
          'utils-vendor': [
            'axios',
            'zustand',
            'framer-motion',
            'react-toastify',
            'lucide-react',
            'tailwind-variants',
            'clsx',
          ],
        },
      },
    },
    // Aumentar o limite de aviso para 1000KB (padrão é 500KB)
    chunkSizeWarningLimit: 1000,
  },
});
