export type User = {
  id: string
  role: 'member' | 'instructor' | 'superAdmin'
  nomPrenom: string
  adresse: string
  imageLink?: string
  DepartmentIds?: string[]
  DepartmentId?: string
}

export type State = {
  user: User | null
}
