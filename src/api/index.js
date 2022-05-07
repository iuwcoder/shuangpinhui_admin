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

// 获取验证码
export const reqCode = (phone) => request(`/user/passport/sendCode/${phone}`)

// 注册
export const reqRegister = (data) => request.post('/user/passport/register', data)

// 登录
export const reqLogin = (data) => request.post('/user/passport/login', data)

// 获取用户信息 发送token
export const reqUserInfo = () => request.get('/user/passport/auth/getUserInfo')

// 退出登录
export const reqLogout = () => request.get('/user/passport/logout')

// 获取用户地址信息 13700000000 111111
export const reqAddressInfo = () => request.get('/user/userAddress/auth/findUserAddressList')

// 获取用户订单交易信息
export const reqOrderInfo = () => request.get('/order/auth/trade')

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => request.get(`/payment/weixin/createNative/${orderId}`)

// 查询订单支付状态
export const reqPayStatus = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取订单列表
export const reqOrderList = (page, limit) => request.get(`/order/auth/${page}/${limit}`)






