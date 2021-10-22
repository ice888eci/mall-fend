import api from '../../api'
import utils from 'utils'

const state = () => ({
  all: [],
  cart: [],
})

const getters = {
  // 商品总价
  cartTotalPrice({ cart }) {
    return cart.reduce((t, v) => t + v.quantity * v.origin_price, 0) * 100
  },
  cartTotalNums({ cart }) {
    return cart.reduce((t, v) => t + v.quantity * 1, 0)
  },
}

const mutations = {
  // 初始化加载所有加入购物车的商品
  setProducts(state, products) {
    state.all = products
  },

  //加入购物车的商品
  pushProductToAll(state, product) {
    state.cart.push(product)
  },
  // 添加选中的商品列表
  pushProductsToCart(state, productList) {
    state.cart = productList
  },
  // 删除当前加入购物车的产品,不管有没有被选中
  deleteProductToAll(state, itemIndex) {
    state.all.splice(itemIndex, 1)
  },
  //修改产品数量注意quantity可能是字符串
  incrementItemQuantity(state, goods) {
    goods.quantity * 1 + 1
  },
  decrementItemQuantity(state, goods) {
    goods.quantity * 1 - 1
  },
}

const actions = {
  // 初始化用户的购物车
  async getAllProducts({ commit }) {
    console.log(utils.GetUser().uid)
    const products = await api.ReqCartAllGoods({
      uid: utils.GetUser().uid,
    })
    commit('setProducts', products)
  },

  // 详情页面更新后台加入购物车操作
  async addProductToAll(context, id) {
    try {
      await api.ReqCartAddGoods({
        uid: utils.GetUser().uid,
        gid: id,
        quantity: 1,
      })
    } catch (error) {
      console.log(error.message)
    }
  },

  async delProductToAll({ state, commit }, goods) {
    const itemIndex = state.all.findIndex((item) => item.id == goods.id)
    if (itemIndex != -1) {
      try {
        let res = await api.ReqCartDelGoods({
          uid: utils.GetUser().uid,
          gid: goods.id,
        })
        console.log(res)
      } catch (error) {
        console.log(error.message)
      }
      commit('deleteProductToAll', itemIndex)
    }
  },

  // 加入已选中到选中列表
  addProductToCart({ state, commit }, selected) {
    const list = state.all.filter((item) => new Set(selected).has(item.id))
    commit('pushProductsToCart', list)
  },

  async incrementItemQuantity({ state, commit }, goods) {
    try {
      await await api.ReqCartUpdateGoods({
        uid: utils.GetUser().uid,
        gid: goods.id,
        type: true,
        quantity: 1,
      })
    } catch (error) {
      console.log(error.message)
    }

    commit('incrementItemQuantity', goods)
  },

  async decrementItemQuantity({ state, commit }, goods) {
    try {
      await await api.ReqCartUpdateGoods({
        uid: utils.GetUser().uid,
        gid: goods.id,
        type: false,
        quantity: 1,
      })
    } catch (error) {
      console.log(error.message)
    }
    commit('incrementItemQuantity', goods)
  },
}

export default { state, getters, mutations, actions, namespaced: true }
