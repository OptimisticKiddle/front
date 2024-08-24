import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/reset.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
