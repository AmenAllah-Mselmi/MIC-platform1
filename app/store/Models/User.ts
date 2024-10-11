export type User = {
  id: string
  role: 'member' | 'instructor' | 'superAdmin'
}

export type State = {
  user: User | null
}
