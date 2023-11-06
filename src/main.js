import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import store from './store/store'
import router from './router/router'

createApp(App).use(router).use(store).mount('#app')
