import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vuex from 'vuex'
// Vue.use(Vuex)

// const store = new Vuex.Store({
//     state: {
//       count: 0
//     },
//     mutations: {
//       increment (state) {
//         state.count++
//       }
//     }
//   }) 

const app = createApp(App)

app.use(router)
app.mount('#app')

