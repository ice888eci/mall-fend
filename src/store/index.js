import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import search from './modules/search'
import cart from './modules/cart'
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    search,
    cart,
  },
})
