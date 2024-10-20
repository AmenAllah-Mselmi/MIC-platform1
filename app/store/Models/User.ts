export type User = {
  id: string
  role: 'member' | 'instructor' | 'superAdmin'
  Departement: string[] | string
}

export type State = {
  user: User | null
}
