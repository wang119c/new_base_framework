const Mock = require('mockjs')

const tokens = {
  13126858018: {
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjgwYmMxYjkyLWUyNjAtNDRiMy1hNmNhLTZjNTJjYzY2NWY2NyJ9.QtQDXq1I7rfFoDznFi9O82gFOI-5bNvQL-Iq5hBwXQdxEin0QG-YgANIkbVJMiW1bw4ore08NpJyvbTui6REag'
  }
}

module.exports = [{
  url: '/client-live/user/login',
  type: 'post',
  response: config => {
    const { username } = config.body
    const token = tokens[username]
    // mock error
    if (!token) {
      return {
        code: '-1',
        msg: '账号不存在',
        data: null
      }
    }
    return {
      code: '0',
      data: token,
      msg: '登录成功'
    }
  }
}, {
  url: '/client-live/user/info',
  type: 'get',
  response: config => {
    const info = {
      user: {
        createBy: Mock.mock('@string("lower", 5)'),
        createTime: Mock.mock('@datetime'),
        updateBy: Mock.mock('@string("lower", 5)'),
        updateTime: Mock.mock('@datetime'),
        id: Mock.mock('@integer(60, 100)'),
        userName: '李四',
        email: Mock.mock('@email'),
        phonenumber: '13126858018',
        sex: '男',
        password: '000000',
        workUnit: '北京大学',
        professionalTitle: '保安',
        conversationAuthority: 0,
        viewExpertAuthority: 0,
        viewExpertRatingAuthority: 0,
        status: 0
      }
    }

    return {
      code: '0',
      data: info,
      msg: '接口调用成功'
    }
  }
}, {
  url: '/client-live/user/logout',
  type: 'get',
  response: _ => {
    return {
      code: '0',
      data: null,
      msg: '退出成功'
    }
  }
}, {
  url: '/client-live/user/code/' + '.*',
  type: 'get',
  response: config => {
    return {
      code: '0',
      data: null,
      msg: '发送成功'
    }
  }
}]
