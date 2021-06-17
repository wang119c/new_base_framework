import defaultSetting from '../settings'

const title = defaultSetting.title || '客户端'
export default function getPageTitle (pageName) {
  if (pageName) {
    return `${title} - ${pageName}`
  }
  return title
}
