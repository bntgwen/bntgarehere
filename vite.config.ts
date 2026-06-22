import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      outDir: "dist", // Memaksa output ke folder dist tunggal
    },
  },
  // Kita override preset Nitro-nya agar menghasilkan output statis yang dimengerti Vercel
  nitro: {
    preset: "vercel",
  }
});