import axiosInstance from '@/app/axiosInstance'
import { ENDPOINTS } from '../constants/api'
import { Assignment } from '../Models/Assignment'

export const assignmentController = {
  // Fetch assignments by department ID
  fetchAssignments: async (departmentId: string): Promise<Assignment[] | undefined> => {
    try {
      const response = await axiosInstance.get<Assignment[]>(
        ENDPOINTS.FETCH_ASSIGNMENTS(departmentId)
      )
      console.log('Fetched Assignments:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching assignments:', error)
    }
  },

  // Fetch all assignments
  fetchAllAssignments: async (): Promise<Assignment[] | undefined> => {
    try {
      const response = await axiosInstance.get<Assignment[]>(ENDPOINTS.FETCH_ALL_Assignements())
      console.log('Fetched All Assignments:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching all assignments:', error)
    }
  },

  // Create a new assignment
  createAssignment: async (newAssignment: Omit<Assignment, '_id'>): Promise<Assignment | undefined> => {
    try {
      const response = await axiosInstance.post<Assignment>(
        ENDPOINTS.CREATE_ASSIGNMENT(),
        newAssignment
      )
      console.log('Created Assignment:', response.data)
      return response.data
    } catch (error) {
      console.error('Error creating assignment:', error)
    }
  },

  // Update an existing assignment
  updateAssignment: async (assignmentId: string, updatedAssignment: Partial<Assignment>): Promise<Assignment | undefined> => {
    try {
      const response = await axiosInstance.put<Assignment>(
        ENDPOINTS.UPDATE_ASSIGNMENT(assignmentId),
        updatedAssignment
      )
      console.log('Updated Assignment:', response.data)
      return response.data
    } catch (error) {
      console.error('Error updating assignment:', error)
    }
  },

  // Delete an assignment
  deleteAssignment: async (assignmentId: string): Promise<void> => {
    try {
      await axiosInstance.delete(ENDPOINTS.DELETE_ASSIGNMENT(assignmentId))
      console.log('Deleted Assignment:', assignmentId)
    } catch (error) {
      console.error('Error deleting assignment:', error)
    }
  },
}
