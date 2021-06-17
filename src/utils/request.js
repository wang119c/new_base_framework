import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { generateRandomStr, getBrowserInfo } from '@/utils'
import md5 from 'js-md5'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000000
})
// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers.device_agent = getBrowserInfo()
    config.headers.device_type = 'web'
    config.headers.wait_page = config.url

    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    if (config.xsign) {
      const paramId = generateRandomStr(10)
      const timestamp = String(parseInt(new Date().getTime() / 1000))
      const secret = '123456789'
      const data = JSON.stringify(config.data)
      const signature = md5(paramId + timestamp + secret + data)
      config.headers.Sign = `${paramId},${timestamp},${signature}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (String(res.code) !== '0') {
      // if (res.code === '403') {
      //   Message({
      //     message: res.msg || 'Error',
      //     type: 'error',
      //     duration: 5 * 1000
      //   })
      // }
      // if (res.code === '401') {
      //   MessageBox.confirm('权限不足或登录失效', '确定退出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   }).catch(() => {})
      // }
      Message({
        message: res.msg || 'Error',
        type: 'error'
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.msg,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default service
