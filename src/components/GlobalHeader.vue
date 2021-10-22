<template>
  <nav class="navbar navbar-dark bg-dark justify-content-between mb-4 px-4">
    <a class="navbar-brand">T</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`hi ${user.name}`">
          <dropdown-item disabled><a class="dropdown-item">新建文章</a></dropdown-item>
          <dropdown-item><a class="dropdown-item">我的专栏</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
<!--    <ul v-else class="list-inline mb-0">-->
<!--      <li class="list-inline-item">-->
<!--        <dropdown :title="`你好 ${user.nickName}`">-->
<!--          <dropdown-item><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item>-->
<!--          <dropdown-item><router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link></dropdown-item>-->
<!--          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>-->
<!--          <dropdown-item><a href="#" class="dropdown-item">退出登陆</a></dropdown-item>-->
<!--        </dropdown>-->
<!--      </li>-->
<!--    </ul>-->
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './DropDown.vue'
import DropdownItem from './DropdownItem.vue'
// import { UserProps } from '../store'

export interface UserProps {
  isLogin: boolean,
  name?: string,
  _id?: string;
}
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
