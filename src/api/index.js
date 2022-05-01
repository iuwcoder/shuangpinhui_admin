import request from "./request";

import mokeRequest from "./mockRequest"

// 商品列表数据
export const regCategoryList = () => request.get('/product/getBaseCategoryList')

// 获取banner
export const regBannerList = () => mokeRequest.get('/banner')

// 获取floor数据
export const regFloorList = () => mokeRequest.get('/floor')

// 获取搜索模块
export const reqSearchInfo = (data) => request({
  method: 'post',
  url: '/list',
  data
})

// 获取商品详情
export const reqGoodsInfo = (skuId) => request.get(`/item/${skuId}`)

// 将产品添加到购物车 修改产品购买数量
export const reqAddShopCart = (skuId, skuNum) => request.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 获取购物车列表
export const reqCartList = () => request.get('/cart/cartList')

// 删除购物车产品
export const reqDeleteCart = (skuId) => request.delete(`/cart/deleteCart/${skuId}`)

// 切换商品选中状态
export const reqUpdateChecked = (skuId, isChecked) => request.get(`/cart/checkCart/${skuId}/${isChecked}`)