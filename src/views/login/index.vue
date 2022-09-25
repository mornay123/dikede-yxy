<template>
  <div class="login-container">
    <div class="loginbox">
      <div class="title-container">
        <img src="@/assets/common/logo.png" alt="">
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-mobile-phone" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
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
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="password">
          <div class="el-col el-col-17">
            <span class="svg-container">
              <i class="el-icon-ice-cream" />
            </span>
            <el-input
              :key="codeType"
              ref="code"
              v-model="loginForm.code"
              :type="codeType"
              placeholder="code"
              name="code"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
          </div>
          <div class="el-col el-col-7 code-image">
            <img src="../../assets/common/logo.png" alt="">
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >Login</el-button>

      </el-form>
    </div>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        code: 'ax2p'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#999;
$cursor: #fff;

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
    color: #6878f0
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
