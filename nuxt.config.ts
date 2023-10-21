// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/src/assets/fonts.css',
  ],
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&family=Poppins&display=swap',
      },
    ],
  },
  modules: ['@nuxtjs/tailwindcss']

})
