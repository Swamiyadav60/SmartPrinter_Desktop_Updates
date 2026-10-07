import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'health-endpoint-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/health' || req.url === '/health/') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'ok', service: 'SmartPrinter Update Server' }, null, 2));
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    open: false,
  },
});
