import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session } from '../Models/Session'
import {
  fetchSessions,
  deleteSession,
  addSession,
  updateSession
} from './../Controller/SessionController'

export type State = {
  sessions: Session[] // Liste des sessions
}

export type Actions = {
  fetchSessions: (DepartmentId: string) => Promise<void> // Fonction pour récupérer les sessions
  deleteSession: (id: string | number) => Promise<void> // Fonction pour supprimer une session
  addSession: (sessionData: Session, DepartmentId: string) => Promise<void> // Fonction pour ajouter une session
  updateSession: (id: string | number, sessionData: Session) => Promise<void> // Fonction pour modifier une session
}

// Zustand Store pour les sessions
export const useSessionsStore = create<State & Actions>()(
  persist(
    set => ({
      sessions: [],

      // Récupérer les sessions en fonction du departmentId
      fetchSessions: async (DepartmentId: string) => {
        try {
          const data = await fetchSessions(DepartmentId)
          set({ sessions: data })
          console.log('Sessions fetched successfully')
        } catch (error) {
          console.error('Erreur lors de la récupération des sessions:', error)
        }
      },

      // Supprimer une session par ID
      deleteSession: async (id: string | number) => {
        try {
          await deleteSession(id)
          set(state => ({
            sessions: state.sessions.filter(session => session._id !== id)
          }))
          console.log(`Session with id ${id} deleted successfully`)
        } catch (error) {
          console.error('Erreur lors de la suppression de la session:', error)
        }
      },

      // Ajouter une nouvelle session
      addSession: async (sessionData: Session, DepartmentId: string) => {
        try {
          console.log(sessionData)
          console.log('test data')
          console.log(DepartmentId)
          const addedSession = await addSession(sessionData, DepartmentId) // Appel à l'API pour ajouter la session

          set(state => ({
            sessions: [...state.sessions, addedSession] // Ajoute la nouvelle session à la liste
          }))
          console.log('Session ajoutée avec succès')
        } catch (error) {
          console.error("Erreur lors de l'ajout de la session:", error)
        }
      },

      // Modifier une session existante
      updateSession: async (id: string | number, sessionData: Session) => {
        try {
          console.log("sessionData : ")
          console.log(sessionData)
          const updatedSession = await updateSession(id, sessionData)
          set(state => ({
            sessions: state.sessions.map(session =>
              session._id === id ? updatedSession : session
            )
          }))
          console.log('Session mise à jour avec succès')
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la session:', error)
        }
      }
    }),
    { name: 'session-store', skipHydration: true } // Middleware de persistance
  )
)
