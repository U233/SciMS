<template>
  <div>
    <!-- Home组件 -->
    <el-button type="info" @click="logout">退出</el-button>
    <el-button @click="changeToken">更改token</el-button>
    <el-button @click="checkInter">拦截器测试</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$message('退出登录')
      this.$router.push('/login')
    },
    changeToken () {
      window.sessionStorage.setItem('token', '12351')
    },
    async checkInter () {
      const { data: res } = await this.$http.get('user/update')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
