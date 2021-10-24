<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">  <!--卡片 高度 边框阴影-->
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light my-3 avatar" >
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '../store'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 构造函数断言成类型
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => { // 如果avatar的链接没有, 就替换为默认的本地文件
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return { columnList }
  }
})
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
