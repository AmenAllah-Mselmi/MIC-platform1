import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axiosInstance from '@/app/axiosInstance'
import { User } from '../Models/User'
import { ENDPOINTS } from '../constants/api'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
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

          const {
            id,
            role,
            nomPrenom,
            adresse,
            imageLink,
            DepartmentIds,
            DepartmentId
          } = response.data.user // Récupération des données de l'utilisateur
          const token = response.data.token

          axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`

          set({
            user: {
              id,
              role,
              nomPrenom,
              adresse,
              imageLink,
              DepartmentIds: role == 'member' ? DepartmentIds : undefined, // Récupérer departmentIds seulement pour les membres
              DepartmentId: role == 'instructor' ? DepartmentId : undefined // Récupérer departmentId seulement pour les instructeurs
            },
            isAuthenticated: true
          })

          console.log(
            'Login successful:',
            id,
            role,
            DepartmentIds,
            DepartmentId
          )
        } catch (error) {
          console.error('Login failed:', error)
          throw error
        }
      },
      logout: async () => {
        try {
          const response = await axiosInstance.post(ENDPOINTS.LOGOUT)
          console.log(response)
          set({ user: null, isAuthenticated: false }) // Réinitialiser l'état lors de la déconnexion
        } catch (error) {
          console.error('Logout failed:', error)
        }
      }
    }),
    { name: 'auth-store' }
  )
)
