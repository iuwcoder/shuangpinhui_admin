import { reqSearchInfo } from '@/api'

const state = {
  searchList: []
}

const mutations = {
  SEARCHLIST(state, list) {
    state.searchList = list
  }
}

const actions = {
  async getSearchList({commit}, params={}) {
    // params，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqSearchInfo(params)
    console.log(result);
      if (result.code === 200) {
        commit('SEARCHLIST', result.data)
      }
  }
}

// 简化数据
const getters = {
  // 商品列表
  goodsList(state) {
    return state.searchList.goodsList
  },
  // 品牌
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  // 属性
  attrsList(state) {
    return state.searchList.attrsList
  },

}

export default {
  state,
  mutations,
  actions,
  getters,
  // namespaced: true
}