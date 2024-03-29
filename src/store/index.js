import Vue from 'vue'
import Vuex from 'vuex'
import home from './home.js'
import search from './search.js'
import detail from './detail.js'
import shopCart from './shopcart'
import user from './user'
import trade from './trade'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})
