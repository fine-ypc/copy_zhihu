<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <loader v-if="isLoading" text="拼命加载中"></loader>
    <router-view></router-view> <!--路由对应的组件会渲染在这里-->
    <footer class="text-center py-4 text-secondary bg-light mt-6 mt-3">
      <ul class="list-inline mb-0">
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Loader from '@/components/Loader.vue'
import createMessage from './components/createMessage'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user) // 计算属性监听user动态刷新
    const isLoading = computed(() => store.state.isLoading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    onMounted(() => {
      computed(() => store.state.token) // 计算属性监听user动态刷新
      if (!store.state.user.isLogin && token.value) { // 如果未登录但localstorage中存了token值
        axios.defaults.headers.common.Autheriazation = `Bearer ${token.value}` // 把头装上
        store.dispatch('fetchCurrentUser') // 获取用户信息
      }
    })
    return {
      error: error,
      isLoading: isLoading,
      currentUser: currentUser
    }
  }
})
</script>

<style>
</style>
