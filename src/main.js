import { createApp } from 'vue'
import App from './App.vue'
import store from './store'; // 导入 store

createApp(App).use(store).mount('#app')
