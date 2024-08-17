import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import EN from './locale/en.json'
import PTBR from './locale/ptbr.json'
import FR from './locale/fr.json'
import { createHead } from '@unhead/vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes as autoRoutes } from 'vue-router/auto-routes'

const supportedLanguages = ['en', 'ptbr', 'fr']

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: EN,
    ptbr: PTBR,
    fr: FR,
  }
})

const app = createApp(App)

const head = createHead()

const routes = autoRoutes.map(route => ({
  ...route,
  path: '/:lang?' + route.path
}))

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    else return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const language = to.params.lang as string
  if (supportedLanguages.includes(language)) {
    i18n.global.locale.value = language
  } else {
    return next(`/${i18n.global.locale}${to.path}`)
  }
  next()
})

app.use(router)
app.use(head)
app.use(i18n)
app.mount('#app')

