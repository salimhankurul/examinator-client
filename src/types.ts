
export type UserType = 'student' | 'teacher' | 'admin';

export interface TokenData {
    userType: UserType,
    userId: string,
    IP: string,
    iat: number,
    exp: number,
}

export interface Profile {
    userId: string,
    userType: UserType,
    email: string,
    firstName: string,
    lastName: string,
    courses: string[],  
}