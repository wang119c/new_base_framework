import request from '@/utils/request'

/**
 * 登录
 * @param {*} data
 * @returns
 */
export function login (data) {
  return request({
    // url: '/mobile/login',
    url: '/client-live/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取验证码
 * @param {*} phoneNumber
 * @returns
 */
export function getSmsCode (phoneNumber) {
  return request({
    url: '/client-live/user/code/' + phoneNumber,
    // url: '/code/mobile/' + phoneNumber,
    method: 'get'
  })
}

/**
 * 退出登录
 * @returns
 */
export function logout () {
  return request({
    url: '/client-live/user/logout',
    method: 'get'
  })
}

/**
 * 获取用户信息
 * @returns
 */
export function getInfo () {
  return request({
    url: '/client-live/user/info',
    method: 'get',
    sign: true
  })
}
