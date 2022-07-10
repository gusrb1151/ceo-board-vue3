import './assets/base.scss'
import { createApp } from 'vue'
import tbButton from './components/button/button.vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)

app.component('tbButton', tbButton)

app.mount('#app')
