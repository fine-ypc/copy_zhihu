<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules" v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          type="text"
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, PostProps } from '../store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '../components/Uploader.vue'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const uploadedData = ref()
    const titleVal = ref('')
    const router = useRouter()
    // const route = useRoute()
    // const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    // let imageId = ''
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    // onMounted(() => {
    //   if (isEditMode) {
    //     store.dispatch('fetchPost', route.query.id).then((rawData: ResponseType<PostProps>) => {
    //       const currentPost = rawData.data
    //       if (currentPost.image) {
    //         uploadedData.value = { data: currentPost.image }
    //       }
    //       titleVal.value = currentPost.title
    //       contentVal.value = currentPost.content || ''
    //     })
    //   }
    // })
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId, id } = store.state.user
        if (columnId && id) {
          const newPost: PostProps = {
            id: '1',
            title: titleVal.value,
            content: contentVal.value,
            column: columnId.toString(),
            createdAt: new Date().toLocaleString(),
            author: id
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
          // if (imageId) {
          //   newPost.image = imageId
          // }
          // const actionName = isEditMode ? 'updatePost' : 'createPost'
          // const sendData = isEditMode ? {
          //   id: route.query.id,
          //   payload: newPost
          // } : newPost
          // store.dispatch(actionName, sendData).then(() => {
          //   createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
          //   setTimeout(() => {
          //     router.push({ name: 'column', params: { id: column } })
          //   }, 2000)
          // })
        }
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit
      // isEditMode
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
