import { createApp } from 'vue'
import router from './router'

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './style/tailwind.css'
import './style.css'

import App from './App.vue'

createApp(App).use(router).mount('#app')
