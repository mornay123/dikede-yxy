<template>
  <div class="login-container">
    <div class="loginbox">
      <div class="title-container">
        <img src="@/assets/common/logo.png" alt="">
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">

        <el-form-item prop="loginName">
          <span class="svg-container">
            <i class="el-icon-mobile-phone" />
          </span>
          <el-input
            ref="loginName"
            v-model="loginForm.loginName"
            placeholder="LoginName"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <div class="el-col el-col-17">
            <span class="svg-container">
              <i class="el-icon-ice-cream" />
            </span>
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="code"
            />
          </div>
          <div class="el-col el-col-7 code-image">
            <img :src="codeImage" alt="" @click="onCodeImage">
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          style="width:100%;margin-bottom:30px;"
          @click="onLogin"
        >登录</el-button>

      </el-form>
    </div>

  </div>
</template>

<script>
import { getImageCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: 'ax2p'
      },
      loading: false,
      passwordType: 'password',
      rules: {
        // 此处代码省略
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      codeImage: ''
    }
  },
  watch: {
  },
  created() {
    this.onCodeImage()
  },
  methods: {
    showPwd() {
      // 密码可视input是text类型（可不写），看不见为password类型
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      // 点击时获取焦点，加入异步队列微任务
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    async onLogin() {
      try {
        // 校验表单
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginAction',
          {
            loginName: this.loginForm.loginName,
            password: this.loginForm.password,
            mobile: '',
            code: this.loginForm.code,
            clientToken: this.codeImage.substring(this.codeImage.length - 32),
            loginType: 0,
            account: ''
          }
        )
      } finally {
        this.loading = false
      }
    },
    randomString(e) {
      e = e || 32
      const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
      const a = t.length
      let n = ''
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    },
    async onCodeImage() {
      try {
        const data = await getImageCode(this.randomString(32))
        this.codeImage = data.request.responseURL
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#999;
$cursor: grey;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #d8dde3;
    background: #fff;
    border-radius: 5px;
    color: #999;
  }
  .el-form-item__error {
    color: red;
  }
  .code-image{
    width: 130px;
    height: 50px;
    border:1px solid lawngreen;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
.login-container{
  position: relative;
  height: 100%;
  width: 100%;
  background: url(~@/assets/common/background.png) no-repeat center center/cover;
  .loginbox{
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .title-container{
       position: absolute;
       width: 96px;
       height: 96px;
       top: -46px;
       left: 50%;
       margin-left: -48px;
       img{
          width: 100%;
          height: 100%;
      }
    }
      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
    }
    .login-btn{
       width: 100%;
       height: 52px;
       background: linear-gradient(262deg,#2e50e1,#6878f0);
       opacity: .91;
       border-radius: 8px;
       color: #fff;
       text-shadow: 0 7px 22px #cfcfcf;
    }
}
</style>
