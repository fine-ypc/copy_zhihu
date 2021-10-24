<template>
<teleport to="#back"> <!--这里直接挂载到id="back"的节点下-->
  <div
    class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
    :style="{backgroundColor: background || ''}">  <!--居中 高宽100%-->
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
      </div>
      <div class="text-primary small">
        <span>{{ text || 'loading'}}</span>
      </div>
    </div>
  </div>
</teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String // 提示信息
    },
    background: {
      type: String // 背景颜色定义
    }
  },
  setup () { // 遮罩使用teleport传送到一个div下 这使得我们需要手动在html中加入一个节点 这样可能不是一种良好的组件设计
    // 此时我们在setup(在页面渲染前执行)中进行手动创建节点和手动删除节点
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node) // axios的拦截器请求结束后设置了 不加载 即移除loading
    })
  }
})
</script>

<style>
.loading-container { /*100%遮罩*/
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
