import { request } from '@/utils/http'

export function getJwtToken() {
  return localStorage.getItem('jwtToken')
}
export function setJwtToken(token: string) {
  return localStorage.setItem('jwtToken', token)
}
export function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}
export function setUser(user: { [key: string]: any }) {
  return localStorage.setItem('user', JSON.stringify(user))
}

export async function sendRegister(email: string, username: string, password: string) {
  const res = await request<RegisterResponse>('/api/auth/local/register', {
    method: 'POST',
    auth: false,
    body: {
      email,
      username,
      password,
      nickname: username
    }
  })
  setJwtToken(res.jwt)
  setUser(res.user)
  return res
}

export async function sendLogin(email: string, password: string) {
  const res = await request<RegisterResponse>('/api/auth/local', {
    method: 'POST',
    auth: false,
    body: {
      identifier: email,
      password
    }
  })
  setJwtToken(res.jwt)
  setUser(res.user)
  return res
}

export interface RegisterResponse {
  jwt: string
  user: UserResponse
}
export interface UserResponse {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  nickname: string
  intro: string
  notification: boolean
  avatar_link: string
}
