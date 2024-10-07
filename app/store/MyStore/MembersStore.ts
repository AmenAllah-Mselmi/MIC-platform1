import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { State } from '../Models/Member'
import { fetchMembers } from '../Controller/MemberController'

export type Actions = {
  fetchMembers: () => Promise<void> // Fonction asynchrone pour récupérer les membres
}

// Zustand Store
export const useMemberStore = create<State & Actions>()(
  persist(
    set => ({
      members: [],
      fetchMembers: async () => {
        try {
          const data = await fetchMembers()
          set({ members: data })
        } catch (error) {
          console.error('Error fetching sessions:', error)
        }
      }
    }),
    { name: 'member-store', skipHydration: true } // Middleware de persistance
  )
)
