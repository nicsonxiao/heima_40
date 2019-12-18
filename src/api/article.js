import axios from '@/utils/myaxios'


//获取新闻列表
export const getArticleList=(params)=>{
    return axios({
        url:'/post',
        params
    })
}


//获取新闻详情页
export const getArticleDetail=(id)=>{
    return axios({
        url:`/post/${id}`
    })
}

//文章点赞
export const postLike=id=>{
    return axios({
       url: `/post_like/${id}`
    })
}

//文章收藏
export const starArtcle=id=>{
    return axios({
        url:`/post_star/${id}`
    })
}