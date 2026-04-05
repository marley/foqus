import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webExtension from 'vite-plugin-web-extension'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    webExtension(),
    viteStaticCopy({
      targets: [
        { src: 'content/*', dest: 'content' },
        { src: 'shared/*', dest: 'shared' },
        { src: 'src/assets/icons/*', dest: '.' },
      ],
    }),
  ],
})
