<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="输入手机号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          type="text"
          placeholder="验证码"
          name="password"
          tabindex="2"
          autocomplete="on"
        />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
      <el-button
        :disabled="isDisable"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native="handleCode"
      >
        获取验证码
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { checkMobile, checkCode } from '@/utils/validate'
import { getSmsCode } from '@/api/user'

export default {
  data () {
    const validatorUsername = function (rule, value, callback) {
      if (!checkMobile(value)) {
        callback(new Error('手机号的格式不正确'))
      } else {
        callback()
      }
    }
    const validatorPassword = function (rule, value, callback) {
      if (!checkCode(value)) {
        callback(new Error('验证码格式不正确'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validatorUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatorPassword }
        ]
      },
      loading: false,
      isDisable: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    // 监听账号
    'loginForm.username': {
      handler (newVal, oldVal) {
        if (typeof newVal && newVal === '') {
          this.isDisable = true
        } else {
          this.isDisable = false
        }
      },
      immediate: true
    },
    // 监听路由
    $route: {
      handler (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed () {},
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = Object.assign({}, this.loginForm, {
            loginType: 0,
            userType: 1
          })
          this.$store.dispatch('user/login', params)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('提交错误')
          return false
        }
      })
    },
    handleCode () {
      const { username } = this.loginForm
      getSmsCode(username).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
