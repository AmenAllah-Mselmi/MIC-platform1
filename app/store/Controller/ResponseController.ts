// controllers/memberController.ts

import { ENDPOINTS } from '../constants/api'
import axiosInstance from '@/app/axiosInstance'
import { Response } from '../Models/Response'

export const fetchResponses = async (MemberId: string): Promise<Response[]> => {
  try {
    const response = await axiosInstance.get<Response[]>(
      ENDPOINTS.FETCH_RESPONSES
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des membres:', error)
  }
}

export const addResponse = async (
  Content: string,
  User_Id: string,
  Assignment_Id: string
): Promise<string> => {
  try {
    const response = await axiosInstance.post(
      ENDPOINTS.ADD_RESPONSE_FOR_MEMBER,
      {
        userId: User_Id,
        assignmentId: Assignment_Id,
        content: Content
      }
    )
    console.log(response.data)
    return 'Response added successfully'
  } catch (error) {
    console.error('Error while adding the response:', error)
    return 'Error while adding the response'
  }
}
export const fetchResponseByAssignmentAndUser = async (
  assignmentId: string,
  userId: string
): Promise<Response> => {
  try {
    const response = await axiosInstance.get(
      ENDPOINTS.FETCH_RESPONSE_BY_ASSIGNMENT_AND_USER,
      {
        params: { assignmentId, userId }
      }
    )

    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error while adding the response:', error)
    return null
  }
}
