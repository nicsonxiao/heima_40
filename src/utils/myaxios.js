//引入axios
import axios from 'axios'
import {
    Toast
} from 'vant'

//封装基地址
axios.defaults.baseURL = 'http://localhost:3000'



//添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //将基准路径保存到本地
    localStorage.setItem('hm_40_baseURL', axios.defaults.baseURL)
    let token = localStorage.getItem('hm_40_token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
        Toast.fail('用户信息验证失败')
        //重定向
        window.location.href='#/login'
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios