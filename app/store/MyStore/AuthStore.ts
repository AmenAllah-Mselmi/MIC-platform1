import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axiosInstance from '@/app/axiosInstance'
import { User } from '../Models/User'
import { ENDPOINTS } from '../constants/api'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await axiosInstance.post(ENDPOINTS.LOGIN, {
            email,
            password
          })
          console.log(response)
          const { id, role, Departement } = response.data.user
          const token = response.data.token
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
          console.log('Login successful:', id, role, Departement)
          set({ user: { id, role, Departement } })
          set({ isAuthenticated: true })
        } catch (error) {
          console.error('Login failed:', error)
          throw error
        }
      },
      logout: async () => {
        const response = await axiosInstance.post(ENDPOINTS.LOGOUT)
        console.log(response)
        set({ user: null })
      }
    }),
    { name: 'auth-store' }
  )
)
