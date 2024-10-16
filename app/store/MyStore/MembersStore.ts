import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { State } from '../Models/Member'
import { fetchMembers } from '../Controller/MemberController'

export type Actions = {
  fetchMembers: (departmentId: string) => Promise<void> // Fonction asynchrone pour récupérer les membres
}

// Zustand Store
export const useMemberStore = create<State & Actions>()(
  persist(
    set => ({
      members: [],
      fetchMembers: async (departmentId) => {
        try {
          const data = await fetchMembers(departmentId)
          set({ members: data })
        } catch (error) {
          console.error('Error fetching sessions:', error)
        }
      }
    }),
    { name: 'member-store', skipHydration: true } // Middleware de persistance
  )
)
