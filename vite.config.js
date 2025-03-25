
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // index.html이 루트에 있으니 이대로 둠
  server: {
    port: 5173,
    open: true,
    fs: {
      strict: true
    }
  },
  build: {
    outDir: 'dist'
  }
});