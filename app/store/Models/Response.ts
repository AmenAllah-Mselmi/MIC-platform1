export type Response = {
  _id: string
  Content: string
  User_id: string
  Assignment_id: string
  createdAt: string
  status: string
}

export type State = {
  responses: Response[]
  fetchedResponse: Response | null
}
