import { UsersTableItem } from '../back-types'

export const EXAM_API_URL = '	https://kfptr82hud.execute-api.eu-west-1.amazonaws.com'

export interface LoginReqInput {
  email: string
  password: string
}

export interface LoginReqOutput {
  session: {
    accessToken: string
    refreshToken: string
  }
  user: UsersTableItem
}

export interface LogoutReqInput {
  userId: string
  accessToken: string
}

export interface LogoutReqOutput {
  session: {
    accessToken: string
    refreshToken: string
  }
  user: UsersTableItem
}

export interface GetUserReqInput {
  accessToken: string
}

export interface GetUserReqOutput {
  user: UsersTableItem
}

type APIResponseSuccess<T> = {
  success: true
  data: T
}

type APIResponseError = {
    success: false
    error: string
}

export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError