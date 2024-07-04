import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from 'unhead'



import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const app = createApp(App)

createHead()

app.use(
  createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      else return { top: 0 }
    }
  })
)

app.mount('#app')
