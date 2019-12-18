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

//获取用户信息
export const getUserInfo=id=>{
    return axios({
        url:`/user/${id}`
    })
}

//编辑用户信息
export const editUserInfo=(id,data)=>{
    return axios({
        url:`/user_update/${id}`,
        method:'post',
        data
    })
}


//注册
export const userRegister=(data)=>{
    return axios({
        url:'/register',
        method:'post',
        data
    })
}

//关注用户
export const followUsers=id=>{
    return axios({
        url:`/user_follows/${id}`
    })
}

//取消关注
export const unFollowUsers=id=>{
    return axios({
        url:`/user_unfollow/${id}`
    })
}
