import axios from 'axios'
import { ENDPOINTS } from '../constants/api'
import { Assignment } from '../Models/Assignment'

export const fetchAssignments = async (
  departmentId: string
): Promise<Assignment[]> => {
  try {
    const response = await axios.get<Assignment[]>(
      ENDPOINTS.FETCH_ASSIGNMENTS(departmentId)
    )
    console.log('test')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des Assignments:', error)
  }
}
