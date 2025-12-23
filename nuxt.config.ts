// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modern Nuxt 4 features
  future: {
    compatibilityVersion: 4,
  },

  // Development configuration
  devtools: { enabled: true },
  
  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false, // Disabled to avoid errors from node_modules
  },

  // App configuration
  app: {
    baseURL: '/program-hub/',
    head: {
      title: 'Digital Multimedia Design',
      titleTemplate: '%s | DMD Program',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Inspiring leadership in design through interdisciplinary education. The DMD program spans three colleges at Penn State University.' 
        },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'DMD Program Hub' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/program-hub/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/program-hub/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/program-hub/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/program-hub/favicon-16x16.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&family=Roboto+Mono:wght@400;500;600;700&display=swap' },
      ],
    },
  },

  // CSS configuration
  css: [
    '~/assets/css/main.css',
  ],

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],

  // Nuxt Content configuration
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['javascript', 'typescript', 'vue', 'css', 'html'],
    },
    markdown: {
      anchorLinks: false,
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
    experimental: {
      search: {
        indexed: true,
      },
    },
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  // Image optimization
  image: {
    quality: 80,
    formats: ['webp', 'avif', 'png', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Nitro configuration for static site generation
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      siteUrl: 'https://dmd-program.github.io/program-hub',
      siteName: 'DMD Program Hub',
      siteDescription: 'Inspiring leadership in design through interdisciplinary education.',
      language: 'en',
    },
  },

  // Build configuration
  build: {
    transpile: [],
  },

  // Experimental features
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-11-21',
})
