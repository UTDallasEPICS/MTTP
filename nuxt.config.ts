// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    AUTH0_CLIENT_ID: "",
    AUTH0_CLIENT_SECRET: "",
    AUTH0_BASE_URL: "",
    AUTH0_ISSUER_BASE_URL: "",
    STRIPE_PUBLIC: '',
    STRIPE_SECRET: '',
    AWS_S3_BUCKET_NAME: '',
    EMAIL_SOURCE_ADDRESS: '',
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

})
