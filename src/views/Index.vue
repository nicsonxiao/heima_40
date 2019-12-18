<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;
        <span>搜索商品</span>
      </div>
      <van-icon name="manager-o" class="icon" @click="jump"/>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="item.name" v-for="item in cateList" :key="item.id">
        <van-list
          :immediate-check="false"
          :offset="10"
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
            <hmarticleBlock v-for="art in item.postList" :key="art.id" :post="art"></hmarticleBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getArticleList } from '@/api/article.js'
import hmarticleBlock from '@/components/hm_articleBlock.vue'
export default {
  data() {
    return {
      active: localStorage.getItem('hm_40_token') ? 1 : 0,
      cateList: []
    }
  },
  components: {
    hmarticleBlock
  },
  watch: {
    active() {
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  async mounted() {
    let res = await getCateList()
    if (res.status === 200) {
      this.cateList = res.data.data
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [],
          pageIndex: 1,
          pageSize: 6,
          loading: false,
          finished: false,
          isLoading:false
        }
      })
      this.getPostList()
    }
  },
  methods: {
    async getPostList() {
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex, //显示的页码
        pageSize: this.cateList[this.active].pageSize, //显示的新闻条数
        category: this.cateList[this.active].id //栏目id
      })
      this.cateList[this.active].postList.push(...res.data.data)
      this.cateList[this.active].isLoading=false
      this.cateList[this.active].loading = false
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
      // console.log(res)
    },
    onLoad() {
      this.cateList[this.active].pageIndex++
      this.getPostList()
    },
    onRefresh(){
      this.cateList[this.active].pageIndex=1
      this.cateList[this.active].finished=false
      this.cateList[this.active].postList.length=0
      this.getPostList()
    },
    //实现个人中心跳转
    jump(){
      let id= window.localStorage.getItem('hm_40_id')
      if(id){
        this.$router.push({path:`/personal/${id}`})
      }else{
        this.$router.push({name:'login'})
      }  
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .header {
    display: flex;
    height: 50/360 * 100vw;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    line-height: 50/360 * 100vw;
    color: #fff;
    .icon {
      font-size: 25/360 * 100vw;
      padding: 0 10/360 * 100vw;
    }
    .iconnew {
      font-size: 60/360 * 100vw;
    }
    .center {
      flex: 1;
      height: 40/360 * 100vw;
      line-height: 40/360 * 100vw;
      background-color: #f97979;
      text-align: center;
      border-radius: 20/360 * 100vw;
    }
  }
}
</style>