<template>
  <div class="btn" @click="handlerclick">{{text}}</div>
</template>

<script>
export default {
    props:['text'],
    methods:{
        handlerclick(event){
            this.$emit('click',event)
        }
    }
}
</script>

<style lang="less" scoped>
.btn{
    width:314*100vw/360;
    height: 48*100vw/360;
    background-color: #cc3300;
    color: #fff;
    font-size: 18px;
    border-radius: 24*100vw/360;
    text-align: center;
    line-height: 48*100vw/360;
}
</style>