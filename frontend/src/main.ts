import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import EN from './locale/en.json'
import PTBR from './locale/ptbr.json'
import { createHead } from 'unhead'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes as autoRoutes } from 'vue-router/auto-routes'

const supportedLanguages = ['EN', 'PTBR']

const i18n = createI18n({
  locale: 'EN',
  fallbackLocale: 'EN',
  messages: {
    EN: EN,
    PTBR: PTBR,
  }
})

const app = createApp(App).use(i18n)

createHead()

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
  if (supportedLanguages.includes(language.toUpperCase())) {
    i18n.global.locale = language.toUpperCase()
  } else {
    return next(`/${i18n.global.locale}${to.path}`)
  }
  next()
})

app.use(router)
app.mount('#app')

