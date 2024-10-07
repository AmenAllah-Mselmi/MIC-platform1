export type Assignment = {
  _id: string
  Title: string
  Description: string
  Instructor: string
  DueDate: string
}
export type State = {
  assignments: Assignment[]
}
