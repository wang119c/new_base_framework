/**
 * 验证是不是字符串
 * @param str
 * @returns {boolean}
 */
export function isString (str) {
  return typeof str === 'string' || str instanceof String
}

/**
 * 验证是不是数组
 * @param arg
 * @returns boolean
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 验证是不是外链
 * @param {*} path
 * @returns boolean
 */
export function isExternal (path) {
  return /^(https?:|http?:|mailto:|tel:)/.test(path)
}
/**
 * 检测手机号码
 * @param {*} strMobile
 * @returns
 */
export function checkMobile (strMobile) {
  const regu = /^[1][345678][0-9]{9}$/
  const re = new RegExp(regu)
  return re.test(strMobile)
}

/**
 * 检测验证码
 * @param {*} number
 * @returns
 */
export function checkCode (number) {
  const regu = /^\d{6}$/
  const re = new RegExp(regu)
  return re.test(number)
}
