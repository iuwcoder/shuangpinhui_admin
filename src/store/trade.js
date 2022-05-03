import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  addressInfo: [],
  orderInfo: {}
};

const mutations = {
  USERADDRESS(state, address) {
    state.addressInfo = address
  },
  ORDERINFO(state, order) {
    state.orderInfo = order
  }
};

const actions = {
  // 获取用户地址信息
  async getUserAddress({commit}) {
    let result = await reqAddressInfo()
    if (result.code == 200) {
      commit('USERADDRESS', result.data)
    }
  },

  // 获取订单信息
  async getOrderInfo({commit}) {
    let result = await reqOrderInfo()
    if (result.code == 200) {
      commit('ORDERINFO', result.data)
    }
  }
};

const getters = {};

export default{
  state,
  mutations,
  actions,
  getters
}