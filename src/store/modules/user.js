import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'
const state = {
  token: getToken(),
  username: '',
  info: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_NAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  // 登录
  login ({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params)
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response
          commit('SET_INFO', data.user)
          commit('SET_NAME', data.user.userName)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 重置token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // 退出
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(response => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_INFO', [])
          removeToken()
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
