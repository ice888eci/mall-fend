import Axios from 'axios'
import Config from 'config'
import utils from 'utils'
import { Toast } from 'vant'

class Dao {
  constructor() {
    Axios.defaults.baseURL = Config.dev.http.baseURL
    Axios.defaults.timeout = Config.dev.http.timeout
    this.RequestInterceptors().then()
    this.ResponseInterceptors().then()
  }

  async RequestInterceptors() {
    Axios.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )
  }

  async ResponseInterceptors() {
    Axios.interceptors.response.use(
      ({ data, headers }) => {
        if (headers.hasOwnProperty(Config.dev.token)) {
          console.log(utils.GetToken())
          utils.SetToken(headers.token)
        }

        Toast.clear()
        switch (data.status) {
          case 200:
            return data
          case 403:
            // Toast.fail(data.data[0])
            return data
          case 404:
            return data
          case 500:
            Toast.fail(data.data[0])
            return data
        }
      },
      (error) => {
        Toast.fail('请求超时')
        return Promise.reject(error.message)
      }
    )
  }

  /**
   * get请求
   * @param {url,data,headers} params
   * @returns {object}
   */
  async get(params) {
    try {
      Toast.loading({ message: '加载中...', forbidClick: true, duration: 0 })
      return await Axios.get(params.url, {
        params: params.data,
        headers: { ...utils.GetToken(), ...params.header },
      })
    } catch (e) {
      throw new Error(`GetError:${e.message}`)
    }
  }

  async customGet(params) {
    try {
      return await Axios.get(params.url, {
        params: params.data,
        headers: { ...utils.GetToken(), ...params.header },
      })
    } catch (e) {
      throw new Error(`GetError:${e.message}`)
    }
  }

  /**
   * post请求
   * @param params
   * @returns
   */
  async post(params) {
    try {
      Toast.loading({ message: '加载中...', forbidClick: true, duration: 0 })
      return await Axios.post(params.url, params.data, {
        headers: { ...utils.GetToken(), ...params.header },
      })
    } catch (e) {
      throw new Error(`PostError:${e.message}`)
    }
  }

  async put(params) {
    try {
      Toast.loading({ message: '加载中...', forbidClick: true, duration: 0 })
      return await Axios.put(params.url, params.data, {
        headers: { ...utils.GetToken(), ...params.header },
      })
    } catch (e) {
      throw new Error(`PostError:${e.message}`)
    }
  }
}

export default new Dao()
