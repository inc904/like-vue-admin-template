// import DashBoard from '@/views/dashboard'
import DashBoard from '@/views/dashboard/index.vue'
import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'

// const routes = [
//   { path: '/', component: DashBoard },
//   { path: '/login', component: Login, hidden: true },
//   { path: '/404', component: () => import('@/views/error/404.vue'), hidden: true },
// ]

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: DashBoard,
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'el-icon-s-home' },
      },
    ],
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        component: () => import('@/views/table/index.vue'),
        name: 'Table',
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: 'tree',
        component: () => import('@/views/tree/index.vue'),
        name: 'Tree',
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Form',
    meta: { title: 'Login Form', icon: 'form' },
  },
  {
    path: '/uniformUI',
    component: () => import('@/views/uniformUI/index.vue'),
    name: 'UniformUI',
    meta: { title: 'Uniform UI viewport scaling demo', icon: 'form' },
  },
]
export default routes
