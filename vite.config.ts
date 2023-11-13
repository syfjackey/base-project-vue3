import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import plugins from './plugins'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use  "@/assets/css/variable.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // target:['chrome100'],
    rollupOptions: {
      output: {
        /* 按模块进行打包 */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8088,
    open: false,
    proxy: {
      // '/api': {
      //   target: '默认代理',
      //   secure: false,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '/')
      // }
    }
  }
})
