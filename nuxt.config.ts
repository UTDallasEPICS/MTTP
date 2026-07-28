import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  srcDir: '.',

  css: [
    '~/src/assets/tailwind.css',
    '~/src/assets/fonts.css',
  ],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&family=Poppins&display=swap',
        },
      ],
    },
  },

  modules: [],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "better-auth/client/plugins",
        "better-auth/vue"
      ]
    }
  },

  runtimeConfig: {
    BETTER_AUTH_SECRET: "",
    BETTER_AUTH_URL: "http://localhost:3000",
    SMTP_HOST: "",
    SMTP_PORT: 587,
    SMTP_USER: "",
    SMTP_PASS: "",
    SMTP_FROM: "",
  },

})
