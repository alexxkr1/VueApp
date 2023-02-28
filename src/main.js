import { createApp } from 'vue'
import App from './App.vue'
import { primevueConfig } from "./primevue";
import { createPinia } from "pinia";

import PrimeVue from 'primevue/config';

import router from "../src/router/router";



const app = createApp(App)
primevueConfig(app);
app.use(createPinia());
app.use(PrimeVue)
app.use(router);

import Platform from "./layouts/platform.vue";
app.component("platform-layout", Platform);


app.mount('#app')





