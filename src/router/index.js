import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
console.log('routes:', routes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
