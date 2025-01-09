import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  const isHttps = mode === 'https';

  return {
    plugins: [react(), ...(isHttps ? [mkcert()] : [])],
    css: {
      postcss: './postcss.config.js',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
