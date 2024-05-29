import {
  getUser,
  logoutAndClear,
  sendLogin,
  sendRegister,
  type UserResponse
} from '@/services/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<UserResponse | {}>(getUser() || {})
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
    user.value = {}
  }
  return { user, registerUser, loginUser, logout}
})
