//引入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'

//挂载路由
Vue.use(VueRouter)

//创建路由对象，进行路由配置
var router =new VueRouter({
    routes:[
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'pesonal',
            path:'/personal/:id',
            component:Personal
        }
    ]
})


//添加导航守卫
//to:目标路由对象
router.beforeEach((to, from, next) => {
    if(to.path.indexOf('/personal/')===0){
        //只有访问那些需要授权的api的接口，才需要进行守卫
        let token=localStorage.getItem('hm_40_token')
        //判断是否通过验证
        if(token){  //通过了，就有token数据
            next()
        }else{   //否则跳转到登录页面
            next({name:'login'})
        }
    } else{   //访问不需要授权的页面，就自由访问
        next()
    }
})


export default router
