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
        ></hminput>
        <!-- <input data-v-744880be placeholder="请输入手机号" class="input" /> -->
        <hminput type="password" placeholder="请输入密码" v-model="users.password"></hminput>
        <!-- <input data-v-744880be placeholder="密码" class="input" type="password" /> -->
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <!-- <div data-v-4bc01e24 class="button" @click="login">登录按钮</div> -->
      <hmbutton text="登录" @click="login"></hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
import {userLogin} from '@/api/users.js'
export default {
  data() {
    return {
      users: {
        username: '10086',
        password: '123'
      }
    }
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    handlerinput(data) {
      this.users.username = data
    },
    async login(){
       let res= await userLogin(this.users)
        // console.log(res)
        if(res.data.message==="登录成功"){
                //将当前的用户的token存储到本地
          localStorage.setItem('hm_40_token',res.data.data.token)
                //页面跳转
          this.$router.push({path:`/personal/${res.data.data.user.id}`})
        }else{
          this.$toast.fail(res.data.message)
        }
        // .then(res=>{
        //     console.log(res)
            // if(res.data.message==="登录成功"){
            //     //将当前的用户的token存储到本地
            //     localStorage.setItem('hm_40_token',res.data.data.token)
            //     //页面跳转
            //     this.$router.push({path:`/personal/${res.data.data.user.id}`})
            // }else{
            //   this.$toast.fail(res.data.message)
            // }
        // })
        // .catch(()=>{
        //   this.$toast.fail('登录失败，请重试')
        // })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  height: 100vh;
  background-color: #f2f2f2;
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
// .button{

// }
</style>