import { defineConfig } from 'vite'

// Если ты хочешь IIFE для <script> подключения — формат 'iife'
// Если нужен ES-модуль — формат 'es'
// Можно также собрать сразу оба
export default defineConfig({
  build: {
    lib: {
      entry: 'src/creep.ts',
      name: 'checker', // имя глобального объекта при IIFE
      fileName: (format) => `checker.min.js`,
      formats: ['iife'], // или ['iife'] если только <script>
    },
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      treeshake: true,
      external: [], // если не хочешь бандлить внешние либы, укажи их здесь
      output: {
        globals: {}, // если есть внешние зависимости и ты в iife
      }
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
