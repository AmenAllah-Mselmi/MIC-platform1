import { create } from 'zustand'
import {
  fetchResponses,
  addResponse,
  fetchResponseByAssignmentAndUser
} from './../Controller/ResponseController'
import { State } from '../Models/Response'

// Typage des actions du store
export type Actions = {
  fetchResponses: (MemberId: string) => Promise<void>
  addResponse: (
    Content: string,
    User_Id: string,
    Assignment_Id: string
  ) => Promise<void>
  fetchResponseByAssignmentAndUser: (
    assignmentId: string,
    userId: string
  ) => Promise<void>
}

export const useResponseStore = create<State & Actions>(set => ({
  responses: [],
  fetchedResponse: null,
  fetchResponses: async (MemberId: string) => {
    try {
      const responsesData = await fetchResponses(MemberId)
      set({ responses: responsesData })
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses', error)
    }
  },
  addResponse: async (
    Content: string,
    User_Id: string,
    Assignment_Id: string
  ) => {
    try {
      const newResponse = await addResponse(Content, User_Id, Assignment_Id)
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réponse", error)
    }
  },
  fetchResponseByAssignmentAndUser: async (assignmentId, userId) => {
    try {
      const newResponse = await fetchResponseByAssignmentAndUser(
        assignmentId,
        userId
      )
      set({ fetchedResponse: newResponse })
    } catch (error) {
      console.error('Erreur lors de la récupération de la réponse', error)
      set({ fetchedResponse: null })
    }
  }
}))
