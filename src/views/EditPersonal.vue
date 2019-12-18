<template>
  <div class="editPersonal">
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
      <span slot="right" @click="end">退出</span>
    </hmheader>
    <div class="head">
      <img alt :src="current.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="current.nickname" @click="nicshow=!nicshow"></hmcell>
    <van-dialog v-model="nicshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field :value="current.nickname" label="昵称" placeholder="请输入昵称" ref="nickname" />
    </van-dialog>
    <hmcell title="密码" type="password" :desc="current.password" @click="pwdshow=!pwdshow"></hmcell>
    <van-dialog
      v-model="pwdshow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePwd"
      :before-close="beforeClose"
    >
      <van-field type="password" label="原密码" placeholder="请输入原密码" ref="oldPwd" />
      <van-field type="password" label="新密码" placeholder="请输入新密码" ref="newPwd" />
    </van-dialog>
    <hmcell title="性别" :desc="current.gender===1?'男':'女'" @click="gendershow=!gendershow"></hmcell>
    <van-dialog v-model="gendershow" title="更换性别" show-cancel-button @confirm="updateGender">
      <van-picker :columns="['女','男']" :default-index="current.gender" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header.vue'
import hmcell from '@/components/hm_cell.vue'
import { getUserInfo, editUserInfo } from '@/api/users.js'
import { uploadFile } from '@/api/uploadFile.js'
export default {
  data() {
    return {
      id: '',
      current: {},
      nicshow: false,
      pwdshow: false,
      gendershow: false,
      genderIndex: '',
      oldPwd:'',
      newPwd:''
    }
  },
  components: {
    hmcell,
    hmheader
  },
  methods: {
    //退出按钮
    end() {
      localStorage.removeItem('hm_40_token')
      localStorage.removeItem('hm_40_baseURL'),
        this.$router.push({ name: 'login' })
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //修改头像
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      console.log(res)
      if (res.data.message === '文件上传成功') {
        let res1 = await editUserInfo(this.id, { head_img: res.data.data.url })
        // console.log(res1)
        if (res1.data.message === '修改成功') {
          this.$toast.success('头像修改成功')
          this.current.head_img =
            localStorage.getItem('hm_40_baseURL') + res.data.data.url
        } else {
          this.$toast.fail('头像修改失败')
        }
      } else {
        this.$toast.fail('文件上传失败，请重试')
      }
    },
    //修改昵称
    async updateNickname() {
      let nickname = this.$refs.nickname.$refs.input.value
      // console.log(nickname)
      let res = await editUserInfo(this.id, { nickname })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        this.current.nickname = nickname
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    //修改密码
    async updatePwd() {
      this.oldPwd = this.$refs.oldPwd.$refs.input.value
      if (this.oldPwd === this.current.password) {
        this.newPwd = this.$refs.newPwd.$refs.input.value
        if (!/^\w{3,16}$/.test(this.newPwd)) {
          this.$toast.fail('请输入3~16位的密码')
          return
        }
        let res = await editUserInfo(this.id, { password: this.newPwd })
        // console.log(res)
        if (res.data.message === '修改成功') {
          this.$toast.success('修改密码成功,请重新登录')
          localStorage.removeItem('hm_40_token')
          localStorage.removeItem('hm_40_baseURL')
          this.$router.push({ name: 'login' })
        }
      } else {
        this.$toast.fail('修改密码失败')
      }
    },
    //判断原密码输入是否正确，不正确则模态框则不消失，继续修改
  beforeClose(action, done){
    // console.log(action)
    // console.log(this.oldPwd)
    if(action==='confirm' && this.current.password!==this.oldPwd){
      this.$toast.fail('原密码输入不正确')
      done(false)
    }else if(action==='confirm' && !/^\w{3,16}$/.test(this.newPwd)){
      this.$toast.fail('请输入3~16位新的密码')
      done(false)
    }else{
      done()
    }
  },
    //更换性别
    async updateGender() {
      let res = await editUserInfo(this.id, { gender: this.genderIndex })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('更换性别成功')
        this.current.gender = this.genderIndex
      } else {
        this.$toast.fail('更换性别失败')
      }
    },
    onChange(picker, values, index) {
      this.genderIndex = index
    }
  },
  async mounted() {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      if (this.current.head_img) {
        this.current.head_img =
          localStorage.getItem('hm_40_baseURL') + this.current.head_img
      } else {
        this.current.head_img =
          localStorage.getItem('hm_40_baseURL') + '/uploads/image/default.png'
      }
    } else {
      this.$toast.fail('获取用户信息失败，请重试')
    }
  }
}
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  /deep/.van-uploader__upload {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
