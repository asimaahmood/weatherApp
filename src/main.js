import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NavBar from './components/NavBar.vue';
import moment from 'moment';

const app = createApp(App);

app.config.globalProperties.$moment = moment;
app.component('nav-bar', NavBar);
app.use(router);
app.mount('#app');

