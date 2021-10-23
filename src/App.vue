<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
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
import { defineComponent, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user) // 计算属性监听user动态刷新
    return {
      currentUser: currentUser
    }
  }
})
</script>

<style>
</style>
