
const getters = {
  errorLogs: state => state.errorLog.logs,
  token: state => state.user.token,
  info: state => state.user.info,
  username: state => state.user.username
}
export default getters
