<template>
  <input
    :type="type"
    class="inp"
    :value="value"
    @input="handlerinput"
    @blur="handlerblur"
    :class="{error:!bbc,success:bbc}"
  />
</template>

<script>
export default {
  data() {
    return {
      bbc: false
    }
  },
  mounted() {
    this.bbc = this.value ? true : false
  },
  //type是文本框类型，rules是文本框的验证规则，msg_err是报错内容
  props: ['type', 'value', 'rules', 'msg_err'],
  methods: {
    //响应文本框内容变化
    handlerinput(event) {
      // console.log(event)
      //告诉父组件内容变化，并告诉父组件现在内容是什么
      let value = event.target.value
      if (this.rules) {
        if (this.rules.test(value)) {
          this.bbc = true
        } else {
          this.bbc = false
        }
      } else {
        this.bbc = false
      }
      this.$emit('input', value)
    },
    handlerblur(event) {
      if (this.rules && !this.rules.test(event.target.value)) {
        this.$toast.fail(this.msg_err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inp {
  width: 314 * 100vw/360;
  height: 48 * 100vw/360;
  border: none;
  outline: none;
  border-bottom: 2px solid #757575;
  font-size: 18px;
  margin: 5px 0;
  background-color: transparent;
}
.error {
  border-bottom-color: red;
}
.success {
  border-bottom-color: green;
}
</style>