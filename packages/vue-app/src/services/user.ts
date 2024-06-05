import { request } from '@/utils/http'
import { getUser, setUser } from './auth'

export async function sendUpdateUser(data: UpdateUserParam) {
  const res = await request<UserResponse>(`/api/users/${getUser().id}`, {
    method: 'PUT',
    body: {
      ...data
    }
  })
  setUser(res)
  return res
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

export interface UpdateUserParam {
  avatar_link: string
  username: string
  nickname: string
  intro: string
  notification: boolean
}
