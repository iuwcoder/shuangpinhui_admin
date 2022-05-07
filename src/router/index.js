import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const Home = () => import('@/views/home' /* webpackChunkName: "home" */ ) 
const Search = () => import('@/views/search' /* webpackChunkName: "search" */ ) 
const Detail = () => import('@/views/detail' /* webpackChunkName: "detail" */ )
const AddCartSuccess = () => import('@/views/AddCartSuccess' /* webpackChunkName: "addCartSuccess" */ )
const ShopCart = () => import('@/views/ShopCart' /* webpackChunkName: "shopCart" */ ) 
const Trade = () => import('@/views/Trade' /* webpackChunkName: "trade" */ )
const Pay = () => import('@/views/Pay' /* webpackChunkName: "pay" */ )
const PaySuccess = () => import('@/views/PaySuccess' /* webpackChunkName: "paySuccess" */ )
const Center = () => import('@/views/Center' /* webpackChunkName: "center" */ )
const MyOrder = () => import('@/views/Center/myOrder/MyOrder' /* webpackChunkName: "myOrder" */ )
const GroupOrder = () => import('@/views/Center/groupOrder/GroupOrder' /* webpackChunkName: "groupOrder" */ )

const Login = () => import('@/views/Login' /* webpackChunkName: "login" */ )
const Register = () => import('@/views/Register' /* webpackChunkName: "register" */ )


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
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next();
      }else {
        next(false);
      }
    }
  },
  { // 提交订单页面
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      }else {
        next(false);
      }
    }
  },
  { // 支付成功页面
    path: '/paysuccess',
    component: PaySuccess,
  },
  
  { // 个人中心页面
    path: '/center',
    component: Center,
    children: [
      {
        path: '/center',
        redirect: '/center/myorder'
      },
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      }
    ]
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
router.beforeEach((to, from, next) => {
  // to: 即将跳转的路由，from:从哪个路由过来的，next(path):放行到指定路由
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    // 用户已经登录，不允许去login页面
    if (to.path == '/login') {
      next('/home')
    } else {
      // 登录了，但去的是别的页面
      // 如果用户名已有
      if (name) {
        next()
      } else {
        // 没有用户名，重新获取用户信息
        try {
          store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token 失效了，获取不到用户信息，重新登录
          store.dispatch('logout')
          next('/login')
        }
      }
    }
  } else {
    // 用户未登录，不能去交易、支付、个人中心相关
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
      next('/login?redirect=' + toPath)
    } else {

    }
    next()
  }
})

export default router
