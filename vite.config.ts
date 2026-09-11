import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-pdf-correctly',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.endsWith('.pdf') || req.url.includes('Prince_Shukla_Resume.pdf'))) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="Prince_Shukla_Resume.pdf"');
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  },
  assetsInclude: ['**/*.fbx', '**/*.glb', '**/*.gltf']
});
