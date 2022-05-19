<template>
  <div class="login-container">
    <el-form ref="loginFormRef"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             auto-complete="on"
             label-position="left">
      <h1 class="title">Jump Trading Monitor</h1>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username"
                  :placeholder="t('input_username')"
                  name="username"
                  type="text"
                  auto-complete="on"
                  @keyup.enter="handleLogin" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.password"
                  :type="pwdType"
                  :placeholder="t('input_password')"
                  name="password"
                  auto-complete="on"
                  @keyup.enter="handleLogin" />
        <span class="show-pwd"
              @click="showPwd">
          <svg-icon :icon-class="pwdType=='password'?'eye_closed':'eye_open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   style="width:100%;"
                   @click.prevent="handleLogin">
          {{ t("login") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { dealResponseCode } from '@/utils/functions'

const { t } = useI18n()
const store = useStore()
const router = useRouter()
const loading = ref(false)
const pwdType = ref('')

const loginFormRef = ref()
const loginForm = ref({
  username: '',
  password: '',
})

const loginRules = ref({
  username: [
    {
      required: true,
      message: t('input_name'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: t('input_password'),
      trigger: 'blur',
    },
  ],
})

let redirect = undefined
watch(
  () => router,
  (newValue, oldValue) => {
    console.log(newValue)
    redirect =
      newValue.currentRoute.value.query &&
      newValue.currentRoute.value.query.redirect
  },
  { immediate: true }
)

const showPwd = () => {
  pwdType.value === '' ? (pwdType.value = 'password') : (pwdType.value = '')
}

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) {
      ElMessage.error(t('complete_necessary_message'))
      return
    }

    loading.value = true
    store.dispatch('Login', loginForm.value).then((response) => {
      console.log("login....", response)
      dealResponseCode(
        response,
        function successHandler() {
          console.log('push to:', redirect)
          router.push({ path: redirect || '/' })
        },
        function failHandler() {
          ElMessage.error(response.msg)
        }
      )
      loading.value = false
    })
  })
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

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
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>