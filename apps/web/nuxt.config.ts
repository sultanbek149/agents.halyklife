import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: false,
  devtools: { enabled: false },

  css: ['~/assets/css/tailwind.css'],

  modules: ['@pinia/nuxt', 'shadcn-nuxt'],

  shadcn: {
    prefix: 'Ui',
    componentDir: '@/components/ui',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  imports: {
    dirs: ['composables', 'composables/**', 'stores'],
  },

  runtimeConfig: {
    // Серверный апстрим для прокси /api/gw (обход CORS). Корень шлюза, без /agent.
    // Переопределяется переменной окружения NUXT_API_UPSTREAM.
    apiUpstream: 'https://test-gateway.halyklife.kz',
    public: {
      // Базовый URL агент-сервиса (через шлюз: .../agent → /v1/...).
      // Переопределяется переменной окружения NUXT_PUBLIC_API_BASE.
      apiBase: 'https://test-gateway.halyklife.kz/agent',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru', class: 'dark' },
      title: 'Кабинет агента — Halyk Life',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2aa65c' },
        { name: 'description', content: 'Рабочее место страхового агента Halyk Life' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
