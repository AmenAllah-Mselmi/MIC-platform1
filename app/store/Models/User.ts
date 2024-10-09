export type User = {
  id: string
  role: 'member' | 'instructor' | 'superAdmin'
  token: string
}

export type State = {
  user: User | null
}
