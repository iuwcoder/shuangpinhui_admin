import { reqGoodsInfo, reqAddShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  uuid_token: getUUID() // 游客ID
}
const mutations = {
  GOODINFO(state, data) {
    state.goodInfo = data
  }
}
const actions = {
  // 获取产品信息
  async getGoodInfo({commit}, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GOODINFO', result.data)
    }
  },

  // 添加购物车
  async addShopCart({commit}, {skuId, skuNum}) {
    await reqAddShopCart(skuId, skuNum)
  }
}
const getters = {
  // 简化导航数据
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 简化产品售卖属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || {}
  },

}

export default {
  state,
  mutations,
  actions,
  getters
}