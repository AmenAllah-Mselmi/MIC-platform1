// Store/SessionStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { deleteSession, fetchSessions } from '../Controller/SessionController'
import { State } from '../Models/Session'

type Actions = {
  fetchSessions: (departmentId: string) => Promise<void>
  deleteSession: (id: string | number) => Promise<void> // Fonction asynchrone pour récupérer les membres
}

export const useSessionsStore = create<State & Actions>()(set => ({
  sessions: [],
  fetchSessions: async (departmentId: string) => {
    try {
      const data = await fetchSessions(departmentId)
      set({ sessions: data })
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
  },
  deleteSession: async (id: string) => {
    try {
      // Appel à l'API pour supprimer le membre
      await deleteSession(id)

      set(state => ({
        sessions: state.sessions.filter(session => session._id !== id)
      }))

      console.log(`Session with id ${id} deleted successfully`)
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }
}))
