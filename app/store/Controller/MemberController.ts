// controllers/memberController.ts

import axios from 'axios'
import { ENDPOINTS } from '../constants/api'
import { Member } from '../Models/Member'

export const fetchMembers = async (departmentId): Promise<Member[]> => {
  try {
    const response = await axios.get<Member[]>(
      ENDPOINTS.FETCH_MEMBERS(departmentId)
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des membres:', error)
  }
}
