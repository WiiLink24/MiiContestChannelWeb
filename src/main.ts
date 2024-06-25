import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const app = createApp(App)

app.use(
  createRouter({
    history: createWebHistory(),
    routes,
  })
)

app.mount('#app')
