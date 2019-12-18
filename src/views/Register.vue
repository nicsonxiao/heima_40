<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <hminput
          type="text"
          placeholder="请输入用户名/手机号"
          v-model="users.username"
          :rules="/^1\d{10}$/"
          msg_err="手机号输入不合法，请输入11位手机号"
          ref="username"
        ></hminput>
        <hminput v-model="users.nickname" :rules="/^\S/" placeholder="昵称" msg_err="请输入昵称" ref="nickname"></hminput>
        <hminput
          type="password"
          placeholder="密码"
          v-model="users.password"
          :rules="/^\w{3,16}$/"
          msg_err="请输入3~16位数的密码"
          ref="nickPwd"
        ></hminput>
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <hmbutton text="注册" @click="register"></hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
import { userRegister } from '@/api/users.js'
export default {
  data() {
    return {
      users: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    async register() {
      let username = this.$refs.username.value
      let nickPwd = this.$refs.nickPwd.value
      let nickname=this.$refs.nickname.value
    //   console.log(username)
    //   console.log(nickPwd)
      if (/^1\d{10}$/.test(username) && /^\w{3,16}$/.test(nickPwd) && /^\S/.test(nickname)) {
        let res = await userRegister(this.users)
        // console.log(res)
        if (res.data.message === '注册成功') {
          this.$toast.success('注册成功')
          this.$router.push({ name: 'login' })
        } else {
          this.$toast.success(res.data.message)
        }
      }else if(!/^1\d{10}$/.test(username) || !/^\w{3,16}$/.test(nickPwd) || !/^\S/.test(nickname)){
          if(!/^1\d{10}$/.test(username)){
              this.$toast.fail(this.$refs.username.msg_err)
          }else if(!/^\S/.test(nickname)){
              this.$toast.fail(this.$refs.nickname.msg_err)
          }else{
              this.$toast.fail(this.$refs.nickPwd.msg_err)
          }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>