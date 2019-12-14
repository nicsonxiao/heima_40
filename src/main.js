import Vue from 'vue'
import App from './App.vue'
import {Toast} from 'vant'
import router from '@/router/index.js'

Vue.config.productionTip = false

//移动端消息弹窗
Vue.use(Toast)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')