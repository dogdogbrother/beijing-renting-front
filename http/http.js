import axios from 'axios'

const http = axios.create({
  baseURL: "/api"
})

http.interceptors.request.use(
  config => {
    if (!config.noToken) {
      const token = localStorage.getItem('token')
      if (token) config.headers.token = token
    }
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
    } else if (response.data.msg) {
      return Promise.reject(response.data || {status: 400, msg: "网络错误"})
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default http