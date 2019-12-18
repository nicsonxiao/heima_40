<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span
        @click="FollowUser"
        :class="{active:artDetail.has_follow}"
      >{{artDetail.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{artDetail.title}}</div>
      <div class="desc">
        <span>{{artDetail.user&& artDetail.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-if="artDetail.type===1" v-html="artDetail.content"></div>
      <video class="myvideo" v-if="artDetail.type===2" :src="artDetail.content" controls></video>
      <div class="opt">
        <span class="like" :class="{active:artDetail.has_like}">
          <van-icon name="good-job-o" @click="artLike"  />
          {{artDetail.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article.js'
import { followUsers, unFollowUsers } from '@/api/users.js'
import { postLike } from '@/api/article.js'
export default {
  data() {
    return {
      artDetail: {}
    }
  },
  async mounted() {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let id = this.$route.params.id
    //文章详情
    let res = await getArticleDetail(id)
    if (res.status === 200) {
      this.artDetail = res.data.data
    }
  },
  methods: {
    //关注用户
    async FollowUser() {
      let res
      if (this.artDetail.has_follow === true) {
        res = await unFollowUsers(this.artDetail.user.id)
      } else if (this.artDetail.has_follow === false) {
        res = await followUsers(this.artDetail.user.id)
      }
      this.$toast.success(res.data.message)
      this.artDetail.has_follow = !this.artDetail.has_follow
    },
    //点赞
    async artLike() {
      let res = await postLike(this.artDetail.id)
      this.artDetail.has_like = !this.artDetail.has_like
      if (res.data.message === '点赞成功') {
        this.artDetail.like_length++
      } else if (res.data.message === '取消成功') {
        this.artDetail.like_length--
      }
      this.$toast.success(res.data.message)
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #ccc;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      background-color: red;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .like {
    &.active{
      color: red;
      border-color: red;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
/deep/.photo {
  img {
    width: 100%;
    display: block;
  }
}
.myvideo {
  width: 100%;
  margin-bottom: 10px;
}
</style>
