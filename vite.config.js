import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webExtension from 'vite-plugin-web-extension'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  // vue-i18n defaults to compileToFunction (uses new Function) unless JIT is enabled.
  // Chrome extension MV3 CSP blocks eval; JIT compiler path does not use new Function.
  define: {
    __INTLIFY_JIT_COMPILATION__: true,
  },
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
