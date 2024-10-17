// Controllers/SessionController.ts
import axios from 'axios'
import { Session } from '../Models/Session'
import { ENDPOINTS } from '../constants/api'

export const fetchSessions = async (
  departmentId: string
): Promise<Session[]> => {
  try {
    const response = await axios.get<Session[]>(
      ENDPOINTS.FETCH_SESSIONS_BY_DEPARTMENT(departmentId)
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error)
    throw error
  }
}
export const deleteSession = async (id: string | number): Promise<string> => {
  try {
    const response = await axios.delete(
      ENDPOINTS.DELETE_SESSION_FOR_INSTRUCTOR(id)
    )
    console.log(response.data)
    return 'bonjour'
  } catch (error) {
    return 'Erreur lors de la suppression du Session'
  }
}
