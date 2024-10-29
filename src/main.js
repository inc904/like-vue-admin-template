import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import './styles/index.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './styles/tailwind.css'
import 'element-plus/dist/index.css'

import router from './router'
import App from './App.vue'
const pinia = createPinia()

createApp(App).use(pinia).use(ElementPlus).use(router).mount('#app')
