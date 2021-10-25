<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input :rules="emailRules" v-model="emailValue" placeholder="请输入邮箱地址"
                      type="text"></validate-input> <!--这里emailValue是响应式的, 可被子组件修改-->
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input :rules="passwordRules" v-model="passwordValue" class="form-control"
                      type="password" placeholder="请输入密码"></validate-input>
    </div>
    <template #submit> <!--具名插槽-->
      <button type="submit" class="btn btn-primary mt-2">提交</button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import createMessage from '@/components/createMessage'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const emailValue = ref('')
    const passwordValue = ref('')
    const router = useRouter()
    const store = useStore()
    const onFormSubmit = (result: boolean) => {
      if (result) { // 如果表单参数通过验证
        const payload = {
          email: emailValue,
          passwordValue: passwordValue
        }
        store.dispatch('loginAndFetchUser', payload).then(() => {
          createMessage('登录成功, 2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e.message)
        })
      } else { // 如果登录失败就清空input v-model绑定了input值
        emailValue.value = ''
        passwordValue.value = ''
        console.log(emailValue, passwordValue)
      }
    }
    return {
      emailValue: emailValue,
      emailRules: emailRules,
      passwordRules: passwordRules,
      passwordValue: passwordValue,
      onFormSubmit: onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>
