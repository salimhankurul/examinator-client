import axios from 'axios'
import { EXAM_API_URL } from './settings'

export const createExamRequest = async ({ body, accessToken }) => {
  try {

    const request = await axios.post(
        `${EXAM_API_URL}/CREATE`,
        {
          ...body,
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
