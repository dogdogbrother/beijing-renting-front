import axios from 'axios'

const http = axios.create({
  baseURL: "http://127.0.0.1:7001"
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

export default http