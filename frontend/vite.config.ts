import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "src",
      "@assets": "src/assets",
      "@components": "src/components",
      "@configs": "src/configs",
      "@contexts": "src/contexts",
      "@features": "src/features",
      "@pages": "src/pages",
      "@redux": "src/redux",
      "@routes": "src/routes",
      "@storage": "src/storage",
      "@utils": "src/storage",
    },
  },
});
