import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL:'',
        timeout:5000
    })

    //请求拦截器
    instance.interceptors.request.use(
        config =>config,
        err => {}
    )

    //响应拦截器
    instance.interceptors.response.use(
        res => res.data,
        err => {console.log(err);}
    )

    return instance(config)
}