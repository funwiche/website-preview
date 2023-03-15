// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [{ src: "/js/main.js", defer: true }],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
});
