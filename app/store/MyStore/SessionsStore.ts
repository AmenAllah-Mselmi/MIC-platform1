// Store/SessionStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { fetchSessions } from '../Controller/SessionController'
import { State } from '../Models/Session'

type Actions = {
  fetchSessions: (departmentId: string) => Promise<void>
}

export const useSessionsStore = create<State & Actions>()(
  persist(
    set => ({
      sessions: [],
      fetchSessions: async (departmentId: string) => {
        try {
          const data = await fetchSessions(departmentId)
          set({ sessions: data })
        } catch (error) {
          console.error('Error fetching sessions:', error)
        }
      }
    }),
    { name: 'session-store', skipHydration: true } // Middleware de persistance avec Zustand
  )
)
