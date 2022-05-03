import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const Home = () => import('@/views/home' /* webpackChunkName: "home" */ ) //发现组件
const Search = () => import('@/views/search' /* webpackChunkName: "home" */ ) //搜索组件
const Detail = () => import('@/views/detail' /* webpackChunkName: "home" */ ) //搜索组件
const AddCartSuccess = () => import('@/views/AddCartSuccess' /* webpackChunkName: "home" */ ) //发现组件
const ShopCart = () => import('@/views/ShopCart' /* webpackChunkName: "home" */ ) //发现组件
const Trade = () => import('@/views/Trade' /* webpackChunkName: "home" */ ) //发现组件
const Pay = () => import('@/views/Pay' /* webpackChunkName: "home" */ ) //发现组件


const Login = () => import('@/views/Login' /* webpackChunkName: "home" */ ) //发现组件
const Register = () => import('@/views/Register' /* webpackChunkName: "home" */ ) //发现组件



const routes = [{
    path: '',
    redirect: '/home'
  },
  { //主页
    path: '/home',
    component: Home,
    meta: {
      ShowFooter: true
    }
  },
  { //搜索
    path: '/search/:keyword?',
    component: Search,
    name: "search",
    meta: {
      ShowFooter: true
    },
  },

  { //商品详情
    path: '/detail/:skuId',
    component: Detail,
  },

  { //添加购物车成功
    path: '/addcartauccess',
    component: AddCartSuccess,
  },
  { // 购物车
    path: '/shopcart',
    component: ShopCart,
  },

  { // 支付页面
    path: '/trade',
    component: Trade,
  },
  { // 提交订单页面
    path: '/pay',
    component: Pay,
  },



  { //登录
    path: '/login',
    component: Login,
  },
  { //注册
    path: '/register',
    component: Register,
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

// // 全局前置守卫，路由跳转前进行判断
// router.beforeEach((to, from, next) => {
//   // to: 即将跳转的路由，from:从哪个路由过来的，next(path):放行到指定路由
//   let token = store.state.user.token
//   let name = store.state.user.userInfo.name
//   if (token) {
//     // 用户已经登录，不允许去login页面
//     if (to.path == '/login') {
//       next('/home')
//     } else {
//       // 登录了，但去的是别的页面
//       // 如果用户名已有
//       if (name) {
//         next()
//       } else {
//         // 没有用户名，重新获取用户信息
//         try {
//           store.dispatch('getUserInfo')
//           next()
//         } catch (error) {
//           // token 失效了，获取不到用户信息，重新登录
//           store.dispatch('logout')
//           next('/login')
//         }
//       }
//     }
//   } else {
//     // 用户未登录
//     next()
//   }
// })

export default router
