import { onMounted, onUnmounted, Ref, ref } from 'vue'

// 点击事件抽象为单独的ts文件
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = true
      } else {
        isClickOutside.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
