import Dao from './dao'
import Config from '../config'
import { Toast } from 'vant'
import { ResetCategoryGirds } from '../utils'
const urls = Config.dev.http.apiList

class Api {
  async Register(params) {
    params = { data: params, ...{ url: urls.Register } }
    try {
      const result = await Dao.post(params)
      console.log(result)
      if (result.status != 200) throw new Error(result.data[0])
      return result
    } catch (e) {
      console.error(e.message)
      return null
    }
  }
  async Login(params) {
    params = { data: params, ...{ url: urls.Login } }
    try {
      const result = await Dao.post(params)
      console.log(result)
      if (result.status != 200) throw new Error(result.data.msg)
      return result
    } catch (e) {
      // console.error(e.message)
      Toast.fail(e.message)
      return null
    }
  }

  // 公共接口
  async ReqPublicNav(params = {}) {
    params = { data: params, ...{ url: urls.PublicNav } }
    try {
      const result = await Dao.get(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.error(e.message)
      return null
    }
  }

  // 首页接口
  async ReqFactory(params = { page: 0 }, url, useToast = false) {
    params = { data: params, ...{ url } }
    try {
      if (useToast) Toast.loading({ message: '加载中...', forbidClick: true })
      const result = await Dao.customGet(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      if (e.message == '没有查询到数据') return []
      console.error(e.message)
      // return null
      return []
    }
  }
  async ReqHomeSpecialArea(params = {}) {
    params = { data: params, ...{ url: urls.HomeSpecialArea } }
    try {
      const result = await Dao.get(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.error(e.message)
      return null
    }
  }

  async ReqHomeTabsAllItem(params) {
    return this.ReqFactory(params, urls.HomeTabsAllItem)
  }
  async ReqHomeTabsDinnerItem(params) {
    return this.ReqFactory(params, urls.HomeTabsDinnerItem)
  }
  async ReqHomeTabsQualityItem(params) {
    return this.ReqFactory(params, urls.HomeTabsQualityItem)
  }
  async ReqHomeTabspopularItem(params) {
    return this.ReqFactory(params, urls.HomeTabspopularItem)
  }

  // 猜你喜欢
  async ReqPublicLikeList(params) {
    return this.ReqFactory(params, urls.PublicLikeList)
  }

  // 分类页面
  async ReqCategoryList(params = {}) {
    params = { data: params, ...{ url: urls.CategoryList } }
    try {
      const result = await Dao.get(params)
      if (result.status != 200) throw new Error(result.data[0])

      return ResetCategoryGirds(result.data)
    } catch (e) {
      console.error(e.message)
      return null
    }
  }

  async ReqCategoryListItem(params) {
    return this.ReqFactory(params, urls.CategoryListItem, true)
  }

  // 搜索接口
  async ReqPublicSearchList(params) {
    return this.ReqFactory(params, urls.PublicSearchList)
  }
  //搜索推荐接口
  async ReqPublicSearchRecommend(params) {
    return this.ReqFactory(params, urls.PublicSearchRecommend)
  }

  // 获取所有购物车接口
  async ReqCartAllGoods(params) {
    params = { data: params, ...{ url: urls.CartAllGoods } }
    try {
      const result = await Dao.post(params)
      // console.log(result)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }
  // 商品添加到购物车接口
  async ReqCartAddGoods(params) {
    params = { data: params, ...{ url: urls.CartAddGoods } }
    try {
      const result = await Dao.put(params)
      // console.log(result)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }
  // 更新购物车数量接口
  async ReqCartUpdateGoods(params) {
    params = { data: params, ...{ url: urls.CartUpdateGoods } }
    try {
      const result = await Dao.put(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }

  // 删除购物车商品接口
  async ReqCartDelGoods(params) {
    params = { data: params, ...{ url: urls.CartDelGoods } }
    try {
      const result = await Dao.post(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }

  // 获取所有地址接口
  async ReqAllAddress(params) {
    params = { data: params, ...{ url: urls.AllAddress } }
    try {
      const result = await Dao.post(params)
      // console.log(result)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }
  // 添加地址
  async ReqAddAddress(params) {
    params = { data: params, ...{ url: urls.AddAddress } }
    try {
      const result = await Dao.put(params)
      // console.log(result)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
  // 修改地址接口
  async ReqEditAddress(params) {
    params = { data: params, ...{ url: urls.EditAddress } }
    try {
      const result = await Dao.put(params)
      // console.log(result)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  // 删除地址接口
  async ReqDelAddress(params) {
    params = { data: params, ...{ url: urls.DelAddress } }
    try {
      const result = await Dao.post(params)
      // console.log(result)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  // 获取所有订单接口
  async ReqOrderList(params) {
    params = { data: params, ...{ url: urls.OrderList } }
    try {
      const result = await Dao.post(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }
  // 创建订单接口
  async ReqOrderCreate(params) {
    params = { data: params, ...{ url: urls.OrderCreate } }
    try {
      const result = await Dao.post(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }

  async ReqPayment(params) {
    params = { data: params, ...{ url: urls.Payment } }
    try {
      const result = await Dao.post(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return ''
    }
  }

  // async ReqCheckPayment(params) {
  //   params = { data: params, ...{ url: urls.CheckPayment } }
  //   try {
  //     const result = await Dao.post(params)
  //     if (result.status != 200) throw new Error(result.data[0])
  //     return result.data
  //   } catch (e) {
  //     console.log(e.message)
  //     return {}
  //   }
  // }

  // 获取所有订单
  async ReqOrderAll(params) {
    params = { data: params, ...{ url: urls.OrderAll } }
    try {
      const result = await Dao.post(params)
      console.log(result)
      if (result.status != 200) throw new Error(result.data[0])

      return result.data
    } catch (e) {
      console.log(e.message)
      return []
    }
  }

  // 删除订单
  async ReqDelOrders(params) {
    params = { data: params, ...{ url: urls.DelOrders } }
    try {
      const result = await Dao.post(params)
      if (result.status != 200) throw new Error(result.data[0])
      return result.data
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}

export default new Api()
