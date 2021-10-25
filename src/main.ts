import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.request.use(config => { // 请求前拦截器
  store.commit('setError', { status: false, message: '' }) // 重置一下status, 否则多次错误提交后, status一直是false, watch就没用了
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => { // 请求后拦截器
  setTimeout(() => { // 请求正常
    store.commit('setLoading', false)
  }, 500)
  return config
}, error => { // 响应错误拦截(除了2**以外的状态码)
  console.log(error.response)
  store.commit('setError', { status: true, message: error.response.data.error })
  store.commit('setLoading', false)
  return Promise.reject(error) // 抛出promise的reject, 这个需要在发出这个请求的外面的函数进行捕捉(catch), 否则chrome console会报错
})
createApp(App).use(router).use(store).mount('#app')
