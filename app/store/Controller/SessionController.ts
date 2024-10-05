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
