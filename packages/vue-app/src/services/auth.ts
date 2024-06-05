import { request } from '@/utils/http'
import type { UserResponse } from './user'

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
export function removeItem(item: 'jwtToken' | 'user') {
  return localStorage.removeItem(item)
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

export function logoutAndClear() {
  removeItem('jwtToken')
  removeItem('user')
}

export interface RegisterResponse {
  jwt: string
  user: UserResponse
}
