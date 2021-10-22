<template>
  <div class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm"> <!--提交区域-->
      <slot name="submit">
        <button type="submit" class="btn btn-primary mt-2">提交</button> <!--放点默认内容(如果外面不传submit slot的话)-->
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt' // 事件监听器
type ValidateFunc = () => boolean
type Events = {
  'form-item-created': ValidateFunc; // 即定义函数参数 'form-item-created 为 ValidateFunc类型'
};
export const emitter = mitt<Events>()
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    const submitForm = () => { // map返回Arr中各个函数的执行结果, every在遇到false时返回
      const result = validationFuncArr.map(func => func()).every(result => result)
      context.emit('form-submit', result) // 向父组件传递form-submit信号 值为true
    }
    let validationFuncArr: ValidateFunc[] = []
    const callback = (func: ValidateFunc) => {
      validationFuncArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => { // 当组件被卸载时, 清除掉监听器
      emitter.off('form-item-created', callback)
      validationFuncArr = []
    })
    return {
      submitForm: submitForm
    }
  }
})
</script>

<style scoped>

</style>
