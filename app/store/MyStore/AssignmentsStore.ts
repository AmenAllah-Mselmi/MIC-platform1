import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Assignment } from '../Models/Assignment'
import { fetchAssignments} from '../Controller/AssignmentController'

export type State = {
  assignments: Assignment[]
}

export type Actions = {
  fetchAssignments: (departmentId: string) => Promise<void>
}

// Zustand Store
export const useAssignmentStore = create<State & Actions>()(
  persist(
    set => ({
      assignments: [],
      fetchAssignments: async (departmentId: string) => {
        try {
          const data = await fetchAssignments(departmentId)
          set({ assignments: data })
        } catch (error) {
          console.error('Error fetching assignments:', error)
        }
      }
    }),
    { name: 'assignment-store', skipHydration: true }
  )
)
