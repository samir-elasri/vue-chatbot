import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueChatbot',
      fileName: (format) => `vuechatbot.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
