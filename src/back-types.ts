import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'

export const userType = z.enum(['admin', 'teacher', 'student'])
export const examStatus = z.enum(['normal', 'canceled', 'finished'])
// **********  Courses  **********
// **********  Courses  **********
// **********  Courses  **********

export const courses = [
  {
    id: 'COME125',
    name: 'Introduction to Computer Science',
  },
  {
    id: 'COME225',
    name: 'Data Structures and Algorithms',
  },
  {
    id: 'COME325',
    name: 'Database Systems',
  },
  {
    id: 'COME425',
    name: 'Software Engineering',
  },
  {
    id: 'COME525',
    name: 'Artificial Intelligence',
  },
  {
    id: 'COME625',
    name: 'Computer Networks',
  },
  {
    id: 'COME725',
    name: 'Computer Security',
  },
  {
    id: 'COME825',
    name: 'Distributed Systems',
  },
  {
    id: 'COME925',
    name: 'Cloud Computing',
  },
  {
    id: 'COME1025',
    name: 'Machine Learning',
  },
  {
    id: 'COME1125',
    name: 'Mobile Application Development',
  },
  {
    id: 'COME1225',
    name: 'Web Development',
  },
  {
    id: 'COME1325',
    name: 'Computer Graphics',
  },
  {
    id: 'COME1425',
    name: 'Human-Computer Interaction',
  },
  {
    id: 'COME1525',
    name: 'Natural Language Processing',
  },
]
// **********  Authentication  **********
// **********  Authentication  **********
// **********  Authentication  **********

export const authenticationTableItem = z.object({
  email: z.string().email(),
  password: z.string(),
  userId: z.string(),
})
export type AuthenticationTableItem = z.infer<typeof authenticationTableItem>

// **********  Users  **********
// **********  Users  **********
// **********  Users  **********

export const userCourse = z.object({
  id: z.string(),
  name: z.string(),
})

export const userExam = z.object({
  examId: z.string(),
  examName: z.string(),
  courseId: z.string(),
  courseName: z.string(),
  startDate: z.string(),
  duration: z.number(), // in minutes
  score: z.number(),
  isCreator: z.boolean(), // when true, the user is teacher who created the exam
  isPassed: z.boolean(),
  status: examStatus,
})
export type UsersTableItemExam = z.infer<typeof userExam>

export const usersTableItem = z.object({
  userId: z.string(),
  userType: userType,
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  university: z.string(),
  universityPersonalId: z.string(),
  courses: z.array(userCourse),
  exams: z.record(z.string(), userExam),
})
export type UsersTableItem = z.infer<typeof usersTableItem>

// **********  UserSession  **********
// **********  UserSession  **********
// **********  UserSession  **********

export const sessionTableItem = z.object({
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number(),
})
export type SessionTableItem = z.infer<typeof sessionTableItem>

// **********  Exam Token **********
// **********  Exam Token **********
// **********  Exam Token **********

export interface ExamTicketTokenMetaData {
  examId: string
  userId: string
  courseId: string
  iat?: number
  exp?: number
}

export interface FinishExamTokenMetaData {
  examId: string
  courseId: string
  iat?: number
  exp?: number
}

// **********  Exam DB **********
// **********  Exam DB **********
// **********  Exam DB **********

export const examTableItem = z.object({
  examId: z.string(),
  courseId: z.string(),
  name: z.string(),
  courseName: z.string(),
  description: z.string(),
  minimumPassingScore: z.number(),
  startDate: z.string(),
  duration: z.number(), // in minutes
  createdAt: z.string(),
  createdBy: z.string(),
  questionsMetaData: z.record(z.string(), z.array(z.string())),
  status: examStatus,
})
export type ExamTableItem = z.infer<typeof examTableItem>

// **********  Exam S3 **********
// **********  Exam S3 **********
// **********  Exam S3 **********

export const examOption = z.object({
  optionId: z.string(),
  optionText: z.string(),
})

export const examsQuestion = z.object({
  questionId: z.string(),
  questionText: z.string(),
  correctOptionId: z.string(),
  options: z.array(examOption),
})

export const examS3Item = z.object({
  examId: z.string(),
  examQuestions: z.array(examsQuestion),
})
export type ExamS3Item = z.infer<typeof examS3Item>

// **********  ExamSession  **********
// **********  ExamSession  **********
// **********  ExamSession  **********

export const examSessionTableItem = z.object({
  examId: z.string(),
  userId: z.string(),
  userExamToken: z.string(),
  userAnswers: z.record(z.string(), z.string()),
})
export type ExamSessionTableItem = z.infer<typeof examSessionTableItem>

// **********  Token  **********
// **********  Token  **********
// **********  Token  **********

export const tokenMetaData = z.object({
  userType: userType,
  userId: z.string(),
  IP: z.string(),
  iat: z.number(),
  exp: z.number(),
})
export type TokenMetaData = z.infer<typeof tokenMetaData>



/// FRONT TYPESS


export interface PrivateContext {
  accessToken: string | null | undefined,
  accessTokenData: TokenMetaData | null | undefined,
  user: UsersTableItem | null | undefined,

  login(email: string, password: string): Promise<boolean>
  logout(): Promise<void>
  terminateSession(): Promise<void>
  privateRouteRefreshInit(accessToken: string, accessTokenData: TokenMetaData): void

  setAccessToken: Dispatch<SetStateAction<string | null>>
  setAccessTokenData: Dispatch<SetStateAction<TokenMetaData | null>>
  setUser: Dispatch<SetStateAction<UsersTableItem | null>>
}