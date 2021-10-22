<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailValue" placeholder="请输入邮箱地址"
                        type="text"></validate-input> <!--这里emailValue是响应式的, 可被子组件修改-->
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" class="form-control"></validate-input>
      </div>
      <template #submit> <!--具名插槽-->
        <button type="submit" class="btn btn-primary mt-2">提交</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

const testUser: UserProps = {
  isLogin: true,
  name: 'viking'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
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
    const onFormSubmit = (result: boolean) => {
      console.log(result)
    }
    return {
      emailValue: emailValue,
      emailRules: emailRules,
      passwordRules: passwordRules,
      currentUser: testUser,
      onFormSubmit: onFormSubmit
    }
  }
})
</script>

<style>
</style>
