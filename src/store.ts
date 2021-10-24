import { createStore, Commit } from 'vuex'
import axios from 'axios'
export interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId: number
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
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  isLoading: boolean
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
const store = createStore<GlobalDataProps>({ // 传泛型有助于ide语法提示
  state: {
    isLoading: false,
    columns: [],
    posts: [],
    user: { name: 'viking', isLogin: true, columnId: 1 }
  },
  mutations: {
    login (state) { // 当commit字符串同于函数名时被激活
      state.user = { ...state.user, isLogin: true, name: 'viking' } // ...对象展开符
    },
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
    setLoading (state, status) {
      state.isLoading = status
    }
  },
  actions: {
    fetchColumns (context) {
      getAndCommit('/columns', 'fetchColumns', context.commit) // 抽象actions中get方法加手动commit
    },
    fetchColumn (context, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', context.commit)
    },
    fetchPosts (context) {
      getAndCommit('/posts', 'fetchPosts', context.commit)
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
