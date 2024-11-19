import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['bot.svg', 'bot-192.png', 'bot-512.png'],
      manifest: {
        name: 'Local AI Chat',
        short_name: 'Local AI Chat',
        description: 'Local AI Chat powered by LM Studio',
        theme_color: '#000000',
        icons: [
          {
            src: 'bot-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'bot-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});