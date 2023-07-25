import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// 重置样式( 统一样式的风格 )
import 'normalize.css'
import './assets/main.css'

// 引入路由对象
import router from './router'

createApp(App).use(router).mount('#app')
