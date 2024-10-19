import { create } from 'zustand'
import { Assignment } from '../Models/Assignment'
import { assignmentController } from '../Controller/AssignmentController';

// Define the state type for the store
type AssignmentState = {
  assignments: Assignment[]
  loading: boolean
  error: string | null
  fetchAssignments: (departmentId: string) => Promise<void>
  fetchAllAssignments: () => Promise<void>
  createAssignment: (newAssignment: Omit<Assignment, '_id'>) => Promise<void>
  updateAssignment: (assignmentId: string, updatedAssignment: Partial<Assignment>) => Promise<void>
  deleteAssignment: (assignmentId: string) => Promise<void>
}

// Create the Zustand store
export const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [],
  loading: false,
  error: null,

  // Fetch assignments by department ID
  fetchAssignments: async (departmentId: string) => {
    set({ loading: true, error: null })
    try {
      const assignments = await assignmentController.fetchAssignments(departmentId)
      if (assignments) {
        set({ assignments })
      }
    } catch (error) {
      set({ error: 'Failed to fetch assignments' })
    } finally {
      set({ loading: false })
    }
  },

  // Fetch all assignments
  fetchAllAssignments: async () => {
    set({ loading: true, error: null })
    try {
      const assignments = await assignmentController.fetchAllAssignments()
      if (assignments) {
        set({ assignments })
      }
    } catch (error) {
      set({ error: 'Failed to fetch all assignments' })
    } finally {
      set({ loading: false })
    }
  },

  // Create a new assignment
  createAssignment: async (newAssignment: Omit<Assignment, '_id'>) => {
    set({ loading: true, error: null })
    try {
      const createdAssignment = await assignmentController.createAssignment(newAssignment)
      if (createdAssignment) {
        set((state) => ({ assignments: [...state.assignments, createdAssignment] }))
      }
    } catch (error) {
      set({ error: 'Failed to create assignment' })
    } finally {
      set({ loading: false })
    }
  },

  // Update an existing assignment
  updateAssignment: async (assignmentId: string, updatedAssignment: Partial<Assignment>) => {
    set({ loading: true, error: null })
    try {
      const updated = await assignmentController.updateAssignment(assignmentId, updatedAssignment)
      if (updated) {
        set((state) => ({
          assignments: state.assignments.map((assignment) =>
            assignment._id === assignmentId ? updated : assignment
          ),
        }))
      }
    } catch (error) {
      set({ error: 'Failed to update assignment' })
    } finally {
      set({ loading: false })
    }
  },

  // Delete an assignment
  deleteAssignment: async (assignmentId: string) => {
    set({ loading: true, error: null })
    try {
      await assignmentController.deleteAssignment(assignmentId)
      set((state) => ({
        assignments: state.assignments.filter((assignment) => assignment._id !== assignmentId),
      }))
    } catch (error) {
      set({ error: 'Failed to delete assignment' })
    } finally {
      set({ loading: false })
    }
  },
}))
