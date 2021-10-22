<template>
  <li
    class="dropdown-option"
    :class="{'is-disabled': disabled}"> <!--disabled为true则将class添加进去-->
    <slot></slot>  <!--接收外面传进来的html内容-->
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
.dropdown-option.is-disabled * {  /*既有dropdown-option和is-disabled属性 下面的所有元素*/
  color: #6c757d;
  pointer-events: none;  /*禁止事件*/
  background-color: transparent;
}
</style>
