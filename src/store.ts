import { createStore, Commit } from 'vuex'
import axios from 'axios'
export interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
}
export interface ColumnProps {
  id: string;
  title: string;
  avatar?: string;
  description: string;
}
export interface PostProps {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  column: string;
  author: number;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  isLoading: boolean
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({ // 传泛型有助于ide语法提示
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '', // 程序初始化时尝试从localstorage取token
    isLoading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: { // commit
    // login (state) { // 当commit字符串同于函数名时被激活
    //   state.user = { ...state.user, isLogin: true, name: 'viking' } // ...对象展开符
    // },
    createPost (state, newPost) { // 当commit字符串同于函数名时被激活
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data } // 展开rawData.data 参数值提出来给user初始化
    },
    setLoading (state, status) {
      state.isLoading = status
    },
    setError (state, e:GlobalErrorProps) { // 设置全局错误信息
      state.error = e
    },
    login (state, rawData) { // 当commit字符串同于函数名时被激活
      const { token } = rawData.data // 解构
      state.token = token // ...对象展开符
      axios.defaults.headers.common.Autheriazation = `Bearer ${token}` // 登录成功把token放到默认请求头里
      localStorage.setItem('token', token) // token持久化
    }
  },
  actions: { // dispatch
    fetchColumns (context) {
      getAndCommit('/columns', 'fetchColumns', context.commit) // 抽象actions中get方法加手动commit
    },
    fetchColumn (context, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', context.commit)
    },
    fetchPosts (context) {
      getAndCommit('/posts', 'fetchPosts', context.commit)
    },
    fetchCurrentUser (context) {
      getAndCommit('/user', 'fetchCurrentUser', context.commit)
    },
    login (context, payload) {
      return postAndCommit('/login', 'login', context.commit, payload)
    },
    loginAndFetchUser (context, payload) { // 将login获取token, 然后token获取用户信息 结合(登陆完直接跳到 展示首页)
      return context.dispatch('login', payload).then(() => {
        return context.dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(p => p.column === cid)
    }
  }
})

export default store
