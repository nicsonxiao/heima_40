import Vue from 'vue'
import App from './App.vue'
import {Toast} from 'vant'
import router from '@/router/index.js'
import { Uploader,Dialog,Field,Picker,Icon,Tab,Tabs,List,PullRefresh,SwipeCell,Button     } from 'vant';

Vue.config.productionTip = false

//移动端消息弹窗
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(SwipeCell)
Vue.use(Button)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')