export type Assignment = {
  _id: string
  Title: string
  Description: string
  DueDate: string
  Attachments: string[]
  DepartementId:String;
  Responses:String[];
}
export type State = {
  assignments: Assignment[]
}
