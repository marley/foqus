// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Noto Sans Mono': [400, 500, 600, 700],
      'Inter': [400, 500, 600, 700],
    },
    display: 'swap',
  },

  app: {
    head: {
      title: 'Foqus — Intention-first browsing, not another blocker',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Take back your browsing habits — gently, without shame. Foqus is a Chrome extension that helps you browse with intention, not restriction.' },
        { property: 'og:title', content: 'Foqus — Intention-first browsing' },
        { property: 'og:description', content: 'Take back your browsing habits — gently, without shame.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
})
