<template>
    <div>
        <main-header></main-header>
        <div class="main-cnt">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import MainHeader from './components/MainHeader'
export default {
  name: 'Layout',
  components: {
    MainHeader
  }
}
</script>

<style lang="scss" scoped>
</style>
