import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('@/views/home' /* webpackChunkName: "home" */ ) //发现组件
const Search = () => import('@/views/search' /* webpackChunkName: "home" */ ) //搜索组件
const Detail = () => import('@/views/detail' /* webpackChunkName: "home" */ ) //搜索组件
const AddCartSuccess = () => import('@/views/AddCartSuccess' /* webpackChunkName: "home" */ ) //发现组件
const ShopCart = () => import('@/views/ShopCart' /* webpackChunkName: "home" */ ) //发现组件

const Login = () => import('@/views/login' /* webpackChunkName: "home" */ ) //发现组件
const Register = () => import('@/views/register' /* webpackChunkName: "home" */ ) //发现组件



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
    return { top: 0 }
  },
})

export default router
