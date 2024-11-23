import axiosInstance from '../components/axios/axiosConfig'

export const createUserAccount = async (userData) => {
  try {
    const response = await axiosInstance.post('/create-user-account/', userData)
    return response.data
  } catch (error) {
    console.error('Error creating user account:', error)
    throw error
  }
}
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post('/user-login/', loginData)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}
//Create
export const createCustomer = async (customerData) => {
  try {
    const response = await axiosInstance.post('/customers/', customerData)
    return response.data
  } catch (error) {
    console.error('Error creating customer:', error)
    throw error
  }
}

export const createStatus = async (statusData) => {
  try {
    const response = await axiosInstance.post('/customer-status/', statusData)
    return response.data
  } catch (error) {
    console.error('Error creating social media:', error)
    throw error
  }
}
export const createServices = async (serviceData) => {
  try {
    const response = await axiosInstance.post('/services/', serviceData)
    return response.data
  } catch (error) {
    console.error('Error fetching services:', error)
    throw error
  }
}
export const createSources = async (sourceData) => {
  try {
    const response = await axiosInstance.post('/customer-source/', sourceData)
    return response.data
  } catch (error) {
    console.error('Error creating social media:', error)
    throw error
  }
}

export const createSocialMedia = async (socialMediaData) => {
  try {
    const response = await axiosInstance.post('/customer-social/', socialMediaData)
    return response.data
  } catch (error) {
    console.error('Error creating social media:', error)
    throw error
  }
}
//get
export const getCustomer = async (customerData) => {
  try {
    const response = await axiosInstance.get('/customers/', customerData)
    return response.data
  } catch (error) {
    console.error('Error creating customer:', error)
    throw error
  }
}
export const getStatus = async () => {
  try {
    const response = await axiosInstance.get('/customer-status/')
    return response.data
  } catch (error) {
    console.error('Error creating social media:', error)
    throw error
  }
}
export const getServices = async () => {
  try {
    const response = await axiosInstance.get('/services/')
    return response.data
  } catch (error) {
    console.error('Error fetching services:', error)
    throw error
  }
}
export const getSources = async () => {
  try {
    const response = await axiosInstance.get('/customer-source/')
    return response.data
  } catch (error) {
    console.error('Error creating social media:', error)
    throw error
  }
}

export const getSocialMedia = async () => {
  try {
    const response = await axiosInstance.get('/customer-social/')
    return response.data
  } catch (error) {
    console.error('Error creating social media:', error)
    throw error
  }
}

