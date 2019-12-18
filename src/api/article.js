import axios from '@/utils/myaxios'


//获取新闻列表
export const getArticleList=(params)=>{
    return axios({
        url:'/post',
        params
    })
}