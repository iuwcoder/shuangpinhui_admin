import { regCategoryList, regBannerList, regFloorList } from '@/api'

const state = {
  categoryList: [], // 商品列表数据
  bannerList: [],  // 轮播图
  floorList: [], //floor
}
const mutations = {
  CATEGORYLIST(state, category) {
    state.categoryList = category
  },
  BANNERLIST(state, banner) {
    state.bannerList = banner
  },
  FLOORLIST(state, floor) {
    state.floorList = floor
  }
}
const actions = {
  // 请求商品列表数据
 async getCategoryList({commit}) {
    let result = await regCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },

  // 获取首页轮播图
  async getBannerList({commit}) {
    let result = await regBannerList()
    if (result.code === 200) {
      commit('BANNERLIST', result.data)
    }
  },

  // 获取floor数据
  async getFloorList({commit}) {
    let result = await regFloorList()
    if (result.code === 200) {
      commit('FLOORLIST', result.data)
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}