import { fileURLToPath } from "url";
import path from "path";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import packageJson from './package.json';

// Get the directory name of the current ES6 module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default ({ mode }) => {
  const isDevelopment = mode === 'development';

  const define = {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
  };

  if (isDevelopment) {
    define.global = {};
  }

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define,
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setup.js'],
      globals: true,
      include: ['src/__tests__/**/*.{test,spec}.{js,jsx}'],
      coverage: {
        reporter: ['text', 'json', 'html'],
        include: ['src/components/layout/*.jsx'],
        exclude: [
          'src/__tests__/**',
          'src/main.jsx',
          'src/vite-env.d.ts',
          'src/components/layout/Index.jsx'
        ]
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || 
                  id.includes('scheduler') || 
                  id.includes('prop-types')) {
                return 'vendor-react'
              }

              if (id.includes('@ant-design') || 
                  id.includes('antd') || 
                  id.includes('rc-') ||
                  id.includes('@babel/runtime')) {
                return 'vendor-antd'
              }

              return 'vendor-others'
            }
          }
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    reportCompressedSize: true,
  });
};
