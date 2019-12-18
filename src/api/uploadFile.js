import axios from '@/utils/myaxios.js'


//文件上传
export const uploadFile=data=>{
    return axios({
        url:'/upload',
        method: 'post',
        data
    })
}