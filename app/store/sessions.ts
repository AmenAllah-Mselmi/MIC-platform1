import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Définir les types
export type Session = {
  _id: string
  Title: string
  Description: string
  Instructor: string
  Date: string
  createdAt: string
}

export type State = {
  sessions: Session[]
}

export type Actions = {
  fetchSessions: (departmentId: string) => Promise<void>
}

// Zustand Store
export const useSessionsStore = create<State & Actions>()(
  persist(
    set => ({
      sessions: [],
      fetchSessions: async (departmentId: string) => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/instructor/department/${departmentId}` // Remplacer par l'URL réelle
          )
          const data: Session[] = await response.json()

          set({ sessions: data })
          console.log('data fetched:', data)
        } catch (error) {
          console.error('Erreur lors de la récupération des sessions:', error)
        }
      }
    }),
    { name: 'session-store', skipHydration: true } // Middleware de persistance
  )
)
