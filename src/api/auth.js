import axios from 'axios'
import { EXAM_API_URL } from './settings'

export const loginRequest = async ({ email, password }) => {
  try {

    const request = await axios.post(`${EXAM_API_URL}/SIGNIN`, {
      email,
      password,
    })

    return { success: true, data: request.data }
  } catch (error) {
    return { success: false, error: error.response.data }
  }
}

export const logoutRequest = async ({ userId, accessToken }) => {
    try {
  
      const request = await axios.post(
        `${EXAM_API_URL}/SIGNOUT`,
        {
          userId,
        },
        {
          headers: {
            "access-token": accessToken,
          },
        },
      )
  
      return { success: true, data: request.data }
    } catch (error) {
      return { success: false, error: error.response.data }
    }
  }