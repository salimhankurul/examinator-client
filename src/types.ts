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