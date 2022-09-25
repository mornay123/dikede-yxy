import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, token) { // 发送登录请求，获取token 在后续中还会用到的，所以很直接抽取 出来
      try {
        // 获取token数据
        const { data } = await login(token)
        console.log(data.token)
        // 发送请求获取用户token
        commit('setToken', data.token)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

