<template>
  <div class="focus">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <van-swipe-cell v-for="item in userstarList" :key="item.id">
        <hmArticleBlock :post="item"></hmArticleBlock>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="unStarArt(item.id)" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/hm_header.vue'
import hmArticleBlock from '@/components/hm_articleBlock.vue'
import { getUserStar } from '@/api/users.js'
import { starArtcle } from '@/api/article.js'
export default {
  data() {
    return {
      userstarList: {}
    }
  },
  components: {
    myheader,
    hmArticleBlock
  },
  async mounted() {
    let res = await getUserStar()
    if (res.status === 200) {
      this.userstarList = res.data.data
    }
  },
  methods: {
    async unStarArt(id) {
      let res = await starArtcle(id)
      if (res.data.message === '取消成功') {
        this.$toast.success(res.data.message)
        let res1 = await getUserStar()
        if (res1.status === 200) {
          this.userstarList = res1.data.data
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-button--normal {
  height: 100%;
}
</style>