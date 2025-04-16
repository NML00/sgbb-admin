import './assets/css/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather';
import PageHeaderVue from './components/ui/PageHeader.vue';
import Icon from '@/components/ui/Icon.vue';

import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions, toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.component(VueFeather.name, VueFeather);
app.component('PageHeader', PageHeaderVue);
app.component('Icon', Icon);
app.use(Vue3Toastify, {
    autoClose: 3000,
    transition: toast.TRANSITIONS.BOUNCE,
    clearOnUrlChange: false,
    limit: 3,
    theme: "dark",
    containerClassName: "fincare-toastify",
  } as ToastContainerOptions)
app.use(createPinia())
app.use(router)

app.mount('#app')
