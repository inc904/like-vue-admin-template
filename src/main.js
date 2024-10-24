import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import './style/index.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './style/tailwind.css'
import 'element-plus/dist/index.css'

import router from './router'
import App from './App.vue'

createApp(App).use(ElementPlus).use(router).mount('#app')
