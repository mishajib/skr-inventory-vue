import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


loadFonts()

const pinia = createPinia()
const app   = createApp(App);

app.use(pinia)
    .use(router)
    .use(vuetify)

app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
