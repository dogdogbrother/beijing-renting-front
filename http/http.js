import axios from 'axios'

const http = axios.create({
  baseURL: "/api"
})

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.token = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (response.data.status === 200) {
      return response.data.data || new Object()
    } else {
      alert(response.data.msg)
      return Promise.reject(response.data || {status: 400, msg: "网络错误"})
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default http