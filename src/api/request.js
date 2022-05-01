import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"

import store from '../store/index'

// 创建axios实例
const instance = axios.create({

  // 配置对象
  baseURL: "/api",
  timeout: 5000
})

// 请求拦截器，在发请求之前，请求拦截器可以检测到
instance.interceptors.request.use((config) => {
  // config：配置对象：对象里面有一个属性很重要，headers请求头
  if(store.state.detail.uuid_token) {
    // 请求头添加一个字段(userTempId)，和后台商量好的
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 进度条开始动
  nprogress.start()
  return config
}) 

// 响应拦截器
instance.interceptors.response.use((res) => {
  // 成功的回调
  // 进度条结束
  nprogress.done()
  return res.data
}), (err) => {
  // 失败的回调
  return Promise.reject(err)

}

export default instance