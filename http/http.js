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

export default http