import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
const manifestForPlugin={
  registerTypes:"prompt",
  manifest:{
    "short_name": "Cartzy",
    "name": "Cartzy",
    "description":"Shopping",
    "icons": [
      {
        src: "/cartzy 192x192.svg",
        sizes: "192x192",
        type: "image/png",
     },
     {
        src: "/cartzy 512x512.svg",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
     },
  ],
  theme_color: "#2196f3",
  background_color: "#2196f3",
  display: "standalone",
  scope: "/",
  start_url: "/"
}
}

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
