import axios from 'axios'

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://dev.thabicare.zenix.com.vn/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add the Authorization header with the Bearer token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle errors globally
    console.error('API call error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
