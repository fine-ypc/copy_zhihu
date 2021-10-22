<template>
  <div class="input-validate-container">
    <input type="text" class="form-control" :class="{'is-invalid': inputRef.error}" :value="modelValue"
           @input="updateValue" @blur="validateInput" v-bind="$attrs">
    <span class="invalid-feedback" style="display: block" v-if="inputRef.error">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email',
  message: string
}
export type RulesProp = RuleProp[]
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  inheritAttrs: false, // 禁止根标签继承属性
  setup (props, context) { // context结构出emit
    const inputRef = reactive({
      val: props.modelValue || '', // 可能有初始值, 没有的话就置为空
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput) // 把验证函数传给父组件form
    })
    const validateInput = () => { // 遍历规则
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true // 没有传入验证规则 那就永远是true
    }
    return {
      updateValue: updateValue,
      validateInput: validateInput,
      inputRef: inputRef
    }
  }
})
</script>

<style scoped>

</style>
