import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SearchPage from '@/views/SearchPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import ProfileEditPage from '@/views/ProfileEditPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { getJwtToken } from '@/services/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
  {
    path: '/profile/edit',
    name: 'profileEdit',
    component: ProfileEditPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home'
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  if (to.name !== 'login' && !getJwtToken()) {
    return { name: 'login' }
  }
  if (to.name === 'login' && getJwtToken()) {
    return { name: 'home' }
  }
})

export default router
