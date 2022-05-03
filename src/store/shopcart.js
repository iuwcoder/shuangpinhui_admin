import { reqCartList, reqDeleteCart, reqUpdateChecked} from '@/api'

const state = {
  cartList: []
};

const mutations = {
  CARTLIST(state, cartList) {
    state.cartList = cartList
  }
};

const actions = {
  // 获取购物车列表数据
  async getCartList({commit}) {
    let result =  await reqCartList()
    if(result.code == 200) {
      commit('CARTLIST', result.data)
    }   
  },

  // 删除购物车一个商品
  async deleteCartList({commit}, skuId) {
    await reqDeleteCart(skuId)
  },

  // 修改购物车商品选中状态
  async updateChecked({commit}, {skuId, isChecked}) {
    await reqUpdateChecked(skuId, isChecked)
  },

  // 删除购物车全部选中的商品
  deleteAllChecked({dispatch, getters}) {
    // 获取购物车中全部的产品
    let PromiseALL = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise =  item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
      // 每一次返回的Promise添加到数组当中
      PromiseALL.push(promise)
    })
    // 只要返回的全部都成功，返回结果即为成功
    return Promise.all(PromiseALL)
  },

  // 修改产品全部选中状态
  updateAllChecked({dispatch, state}, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise =  dispatch('updateChecked', {skuId: item.skuId, isChecked})
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
};

const getters = {
  // 返回的数据有些复杂
  cartList(state) {
    return state.cartList[0] || {}
  }

};

export default {
  state,
  mutations,
  actions,
  getters
}