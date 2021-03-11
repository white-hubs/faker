import axios from 'axios'
import { saveXlsx } from './saveFile'
// import { router } from './../router'
// import router from './../router'
const ajax = axios.create({
  baseURL: '/backstage',
  timeout: 15 * 1000
})

ajax.interceptors.request.use(
  config => (config),
  error => {
    throw error
  }
)
// const that = this
ajax.interceptors.response.use(
  async response => {
    if (response.config.responseType === 'blob') {
      if (response.data.type === 'application/octet-stream') {
        try {
          saveXlsx(response.data, decodeURI(response.headers.exportfilename))
          return
        } catch (error) {
          throw new Error(error)
        }
      }
      throw new Error('不支持的请求类型')
    }

    const data = response.data
    const code = data.code
    if (code === 200) {
      // console.log(data.data)
      return data.data
    // if (code === 10012 || code === 20003) {
    //   location.href = '/'
    //   // window.sessionStorage.token = ''
    //   sessionStorage.removeItem('token')
    //   // this.$message('登录已过期请重新登陆')
    //   // myVue.$router.push({
    //   //   path: '/Login'
    //   // })
    //   // router.push({
    //   //     path: '/Login'
    //   //   })
    } else {
      return Promise.reject(code, data.message)
    }
  },
  error => {
    throw error
  }
)

export default ajax
