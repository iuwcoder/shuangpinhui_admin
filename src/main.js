import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, MessageBox } from 'element-ui';

Vue.config.productionTip = false

Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入moke虚拟数据
import "./mock/mockServer"

//引入全部的请求函数
import * as API from '@/api';

import "@/assets/css/reset.css" //清除默认样式
import VueLazyload from 'vue-lazyload';

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/images/logo.png')
})

// 表单验证
import '@/utils/validate'

// 三级联动组件 -- 全局组件
// import TypeNav from '@/components/TypeNav/TypeNav.vue'

// Vue.createApp({}).component('my-component-name', {
//   // ... 选项 ...
// })
// app.component(TypeNav.name, TypeNav)


new Vue({
  router,
  store,
  beforeCreate() {
    // 注册全局事件总线
    Vue.prototype.$bus = new Vue()
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
