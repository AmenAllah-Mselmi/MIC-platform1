import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Définir les types
export type Member = {
  NomPrenom: string
  className: string
  ImageLink: string
}

export type State = {
  members: Member[] // Tableau de membres
}

export type Actions = {
  addMember: (NomPrenom: string, className: string, ImageLink: string) => void
  fetchMembers: () => Promise<void> // Fonction asynchrone pour récupérer les membres
}

// Zustand Store
export const useMemberStore = create<State & Actions>()(
  persist(
    set => ({
      members: [], // Initialisation vide

      // Fonction pour ajouter un membre manuellement
      addMember: (NomPrenom: string, className: string, ImageLink: string) =>
        set(state => ({
          members: [...state.members, { NomPrenom, className, ImageLink }]
        })),

      // Fonction pour récupérer les membres depuis une API
      fetchMembers: async () => {
        try {
          const response = await fetch(
            'http://localhost:4000/api/member/all' // Remplacer par l'URL réelle
          )
          const data: Member[] = await response.json()

          // Mettre à jour le store avec les membres récupérés
          set({ members: data })
          console.log('data fetched:', data)
        } catch (error) {
          console.error('Erreur lors de la récupération des membres:', error)
        }
      }
    }),
    { name: 'member-store', skipHydration: true } // Middleware de persistance
  )
)
