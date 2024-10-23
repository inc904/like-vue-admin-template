// import DashBoard from '@/views/dashboard'
import DashBoard from '@/views/dashboard/index.vue'
import Login from '@/views/login/index.vue'

const routes = [
  { path: '/', component: DashBoard },
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: () => import('@/views/error/404.vue'), hidden: true },
]
export default routes
