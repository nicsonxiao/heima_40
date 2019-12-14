//引入axios请求
import axios from '@/utils/myaxios.js'

//添加方法实现登录
export const userLogin=(data)=>{
    //axios返回是一个promise对象
    return axios({
        method:'post',
        url:'/login',
        data
    })
}