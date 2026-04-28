import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import router from './router'
import App from './App.vue'

// Global styles — tokens, reset, primeflex
// DO NOT import any PrimeVue theme CSS — we use unstyled mode with WALA_TOKENS
import '@/assets/styles/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true })  // ← unstyled: no PrimeVue CSS, WALA_TOKENS drive all styling
app.use(ToastService)

app.mount('#app')
