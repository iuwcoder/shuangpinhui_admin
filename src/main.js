import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 注册全局事件总线
Vue.prototype.$bus = new Vue()

// 三级联动组件 -- 全局组件
// import TypeNav from '@/components/TypeNav/TypeNav.vue'

// Vue.createApp({}).component('my-component-name', {
//   // ... 选项 ...
// })
// app.component(TypeNav.name, TypeNav)

// 引入moke虚拟数据
import "./mock/mockServer"

//引入全部的请求函数
import * as API from '@/api';

import "swiper/css/swiper.css"

import "@/assets/css/reset.css" //清除默认样式

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
