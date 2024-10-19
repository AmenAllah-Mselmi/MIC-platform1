export type Session = {
  _id: string
  Title: string
  Description: string
  Instructor: string
  Date: string
  createdAt: string
  Room: string
}

export type State = {
  sessions: Session[]
}
