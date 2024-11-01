<template>
  <div class="login-container">
    <el-form ref="formRef" :model="loginForm" :rules="loginRules" size="large" class="login-form w-[520px] p-[35px]">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="Username">
          <template #prefix>
            <el-icon class="el-input__icon">
              <UserFilled />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="loginForm.password" ref="passwordRef" :type="passwordType" placeholder="Password"
          :prefix-icon="Lock">
          <template #suffix>
            <el-icon @click="showPw" class="el-input__icon cursor-pointer">
              <View v-show="pwdView" />
              <Hide v-show="!pwdView" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="w-full" @click="submitForm(formRef)">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { UserFilled, Lock, Unlock, View, Hide } from '@element-plus/icons-vue'
import { validUsername } from '@/utils/validate'

defineOptions({ name: 'Login' })
const formRef = ref()
const loginForm = reactive({
  username: '',
  password: '',
})
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
const passwordType = ref('password')

const loginRules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
}
const pwdView = ref(true)
const passwordRef = ref()
const showPw = () => {
  pwdView.value = !pwdView.value
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
  console.log('passwordRef', passwordRef.value)
  nextTick(() => {
    passwordRef.value.focus()
  })
}
const submitForm = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .el-input {
    .el-input__wrapper {
      height: 47px;
      background: transparent;
    }

    input {
      background: transparent;
      border: 0px;
      appearance: none;
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
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    padding: 350px 35px 0;
    margin: 0 auto;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
