<template>
  <div class="loginContainer">
    <div class="loginBox">
      <!-- 登录框左边logo+图像区域 -->
      <div class="loginBoxInfo">
        <img class="logo" src="../assets/image/sicnuLogo.png" alt="">
        <img class="sciImage" src="../assets/image/SciImage.jpg" alt="">
      </div>
      <!-- 登录框表单区域 -->
      <div class="loginBoxContent">
        <el-form ref="loginFormRef" label-width="0px" class="loginForm" :model="loginForm" :rules="loginFormRules">
          <p>登录</p>
          <!-- 用户名 -->
          <label class="formLabel">用户名 / 邮箱</label>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <label class="formLabel">密码</label>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <div class="btns">
            <el-form-item>
              <el-button type="primary" class="loginBtn" @click="login">登录</el-button>
              <el-button type="text" class="registerBtn">创建用户</el-button>
              <el-button type="text" class="forgetPwdBtn">忘记密码?</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名或邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('login', this.loginForm)
        // 如果登录失败，显示失败信息
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        // 登录成功，存储token，跳转到主页
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.loginContainer{
  height: 100%;
  background-color: #fafafa;
}
.loginBox{
  width: 1000px;
  height: 520px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #999999;
  padding: 40px 0 40px 0;
}
.loginBoxInfo{
  display: inline-block;
  height: 100%;
  width: 360px;
  padding: 0 69px 0 70px;
  border-right: 1px #e4e4e4 solid;
  vertical-align: top;

  .logo{
    display: block;
    height: 50px;
    margin: 0 auto;
  }
  .sciImage{
    display: block;
    width: 325px;
    margin: 0 auto;
  }
}
.loginBoxContent{
  display: inline-block;
  height: 100%;
  width: 400px;
  padding: 0 50px 0 50px;
  vertical-align: top;

  p{
    font-size: 32px;
    font-family: Arial;
    margin: 0 0 32px 0;
  }
}
.formLabel{
  font-size: 16px;
  font-family: Arial;
  display: block;
  margin: 8px 0;
}
.btns{
  padding: 10px 0 0 0;

  .loginBtn{
    font-size: 16px;
    width: 100%;
  }
  .el-button{
    margin: 0;
  }
  .forgetPwdBtn{
    color: #aeaeae;
    float: right;
  }
}
</style>
