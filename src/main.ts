import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.request.use(config => { // 请求前拦截器
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => { // 请求后拦截器
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
})
createApp(App).use(router).use(store).mount('#app')
