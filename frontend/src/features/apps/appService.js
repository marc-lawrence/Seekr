import axios from 'axios'

const API_URL = '/api/apps/'

// Create new App
const createApp = async (appData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, appData, config)

  return response.data
}


// Get user apps
const getApps = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}


// Get user single app
const getSingleApp = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + id, config)


  return response.data
}


// Update app
const updateApp = async (appData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + appData._id, appData, config)

  return response.data
}


// Delete user app
const deleteApp = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}


const appService = {
  createApp,
  getApps,
  getSingleApp,
  updateApp,
  deleteApp
}

export default appService