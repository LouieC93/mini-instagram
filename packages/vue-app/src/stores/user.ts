import { getUser, logoutAndClear, sendLogin, sendRegister } from '@/services/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { sendUpdateUser, type UserResponse } from '@/services/user'
import { sendFileUpload } from '@/services/common'

export const useUserStore = defineStore('userStore', () => {
  function _getInitUser() {
    return {
      id: NaN,
      username: '',
      email: '',
      provider: '',
      confirmed: true,
      blocked: false,
      createdAt: '',
      updatedAt: '',
      nickname: '',
      intro: '',
      notification: true,
      avatar_link: ''
    }
  }
  const user = ref<UserResponse>(getUser() || _getInitUser())
  async function registerUser(params: { email: string; username: string; password: string }) {
    const { email, username, password } = params
    const userData = await sendRegister(email, username, password)
    user.value = userData.user
  }
  async function loginUser(params: { email: string; password: string }) {
    const { email, password } = params
    const userData = await sendLogin(email, password)
    user.value = userData.user
  }
  function logout() {
    logoutAndClear()
    user.value = _getInitUser()
  }

  async function uploadAvatar(file: File) {
    const res = await sendFileUpload(file)
    return res
  }

  async function updateUserData(data: any) {
    const updatedUser = await sendUpdateUser(data)
    user.value = updatedUser
  }
  return { user, registerUser, loginUser, logout, updateUserData, uploadAvatar }
})
