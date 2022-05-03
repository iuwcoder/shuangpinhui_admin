// 登录注册业务
import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
};

const mutations = {
  USERCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, data) {
    state.userInfo = data
  },
  // 清除本地数据
  LOGOUT(state) {
    state.token = '',
    state.userInfo = {},
    removeToken()
  }
};

const actions = {
  // 获取验证码
  async getCode({commit}, phone) {
    let result = await reqCode(phone)
    if (result.code == 200) {
      commit('USERCODE', result.data)
    }
  },

  // 用户注册
  async userRegister({commit}, user) {
    await reqRegister(user)
  },

  // 用户登录
  async userLogin({commit}, data) {
    let result = await reqLogin(data)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      setToken(result.data.token)
    }   
  },

  // 获取用户信息
  async getUserInfo({commit}) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('USERINFO', result.data)
    }
  },

  // 退出登录
  async userLogout({commit}) {
    let result = await reqLogout()
    if (result.code == 200) {
      commit('LOGOUT')
    }
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}