import axios from 'axios'

const BASE_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data'
const TOKEN = "9e54c341-39bf-11ef-8e53-0a00184fe694"
console.log('TOKEN:', TOKEN) 
export const getProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/province`, {
      headers: {
        'Content-Type': 'application/json',
        'Token': TOKEN
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch provinces:', error)
    throw error
  }
}

export const getDistricts = async (provinceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/district`, {
      headers: {
        'Content-Type': 'application/json',
        'Token': TOKEN
      },
      params: {
        province_id: provinceId
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch districts:', error)
    throw error
  }
}

export const getWards = async (districtId) => {
  try {
    const response = await axios.get(`${BASE_URL}/ward`, {
      headers: {
        'Content-Type': 'application/json',
        'Token': TOKEN
      },
      params: {
        district_id: districtId
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch wards:', error)
    throw error
  }
}