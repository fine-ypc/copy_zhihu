import { onUnmounted } from 'vue'

function useDOMCreate (nodeId: string):void { // 创建节点和删除节点抽出来写成函数
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDOMCreate
