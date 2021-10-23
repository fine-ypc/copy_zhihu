<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h2 class="font-weight-light">阿弥陀佛</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始念经</a>
          </p>
        </div>
      </div>
    </section>
    <column-list :list="columns_list"></column-list>
  </div>
</template>

<script lang="ts">
import ColumnList from '@/components/ColumnList.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore()
    return {
      columns_list: computed(() => store.state.columns) // 从计算属性中返回响应式对象, 当对象更新时, computed也会重新执行
    }
  }
}
</script>

<style scoped>

</style>
