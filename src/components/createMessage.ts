import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'
// 将组件调用改为函数调用的形式, 参考vue的 createApp 和 mount
const createMessage = (message: string, type: MessageType, timeout = 2000):void => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
