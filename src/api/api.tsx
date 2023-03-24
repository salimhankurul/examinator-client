import axios from 'axios'
import { APIResponse, EXAM_API_URL, GetUserReqInput, GetUserReqOutput, LoginReqInput, LoginReqOutput, LogoutReqInput, LogoutReqOutput } from './types'

export const loginRequest = async ({ email, password }: LoginReqInput): Promise<APIResponse<LoginReqOutput>> => {
  try {

    const request = await axios.post(`${EXAM_API_URL}/SIGNIN`, {
      email,
      password,
    })

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const logoutRequest = async ({ userId, accessToken }: LogoutReqInput): Promise<APIResponse<LogoutReqOutput>> => {
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
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const getProfileRequest = async ({ accessToken }: GetUserReqInput): Promise<APIResponse<GetUserReqOutput>> => {
  try {

    const request = await axios.post(
      `${EXAM_API_URL}/GET_USER`,
      {},
      {
        headers: {
          "access-token": accessToken,
        },
      },
    )

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

// export const updateProfileRequest = async ({ accessToken, body }: { accessToken: string; body: any }) => {
//   try {
//     console.log('updateProfileRequest input', { body, accessToken })

//     const request = await axios.post(
//       `${EXAM_API_URL}/SET_PROFILE`,
//       {
//         ...body,
//       },
//       {
//         headers: {
//           _token: accessToken,
//         },
//       },
//     )
//     console.log('updateProfileRequest response', request.data)
//     return { success: request.data }
//   } catch (error: any) {
//     return { error: error.response.data }
//   }
// }


