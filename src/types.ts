import React, { Dispatch, SetStateAction, useState } from 'react'

export type UserType = 'student' | 'teacher' | 'admin';

export interface TokenData {
    userType: UserType,
    userId: string,
    IP: string,
    iat: number,
    exp: number,
}

export interface Course {
    value: string,
    label: string,
}

export interface Profile {
    userId: string,
    userType: UserType,
    email: string,
    firstName: string,
    lastName: string,
    courses: Course[],  
}

export interface Context {
    accessToken: string,
    accessTokenData: TokenData,
    profile: Profile,

    login: (email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
    tokenExpired: () => void
    initAuth: (accessToken: string, accessTokenData: TokenData) => void

    setAccessToken: Dispatch<SetStateAction<string | null | undefined>>
    setAccessTokenData: Dispatch<SetStateAction<TokenData | null | undefined>>
    setProfile: Dispatch<SetStateAction<Profile | null | undefined>>
}