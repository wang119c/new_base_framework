<template>
  <div class="header-wrapper">
    <header class="header" ref="header">
      <div class="header-left">
        <router-link to="/">
          <slot>
            <img src="~@/assets/images/logo.png" class="img-style" />
          </slot>
        </router-link>

        <!-- 导航 -->
        <ul class="nav">
          <li class="nav-item">
            <router-link active-class="active" to="/home">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" to="/meetingList"
              >会议列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link active-class="active" to="/siteList"
              >场地列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link active-class="active" to="/fullAgenda"
              >全部会议议程</router-link
            >
          </li>
        </ul>
      </div>
      <div class="header-right">
        <div class="search">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search">
          </el-input>
        </div>
        <div class="logout">
          <el-dropdown
            class="avatar-container right-menu-item hover-effect"
            trigger="click"
          >
            <div class="avatar-wrapper">
              <svg-icon
                icon-class="default-avatar"
                class-name="user-avatar"
              ></svg-icon>
              <span class="username">张晨光</span>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">
                <span style="display: block">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  methods: {
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 0 10px 10px 0px #ddd;
  padding: 0 20px;
  box-sizing: border-box;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

.header-left {
  display: flex;
  .img-style {
    width: 270px;
    margin-top: 5px;
  }
  .nav {
    background: transparent;
    padding: 0;
    margin: 0;
    margin-left: 40px;
    width: 420px;
    &::before,
    &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both;
    }
    .nav-item {
      margin: 0;
      text-align: center;
      float: left;
      position: relative;
      cursor: pointer;
      line-height: 70px;
      padding: 0 20px;
      a {
        text-decoration: none;
        color: #30333c;
        opacity: 0.5;
        display: block;

        &.active,
        &:hover {
          opacity: 1;
          font-weight: bold;
        }

        &.active::after {
          content: "";
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: calc(50% - 40px);
          width: 80px;
          height: 5px;
          background: #306ce8;
        }
      }
    }
  }
}
.header-right {
  display: flex;
  justify-content: space-between;
  .search {
    width: 230px;
    margin-top: 20px;
    margin-right: 20px;
  }
  .logout {
    .user-avatar {
      width: 40px;
      height: 40px;
      color: #306ce8;
      margin-right: 10px;
      float: left;
      margin-top: 15px;
    }
    .username {
      color: #30333c;
      line-height: 70px;
      cursor: pointer;
    }
  }
}
</style>
