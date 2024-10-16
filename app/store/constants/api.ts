export const API_BASE_URL = 'http://localhost:4000/api'
export const ENDPOINTS = {
  // Assignments : 
  FETCH_ASSIGNMENTS: (departmentId: string) =>
    `${API_BASE_URL}/member/department/${departmentId}`,

  // Sessions : 
  FETCH_SESSIONS_BY_DEPARTMENT: (departmentId: string) =>
    `${API_BASE_URL}/session/department/${departmentId}`,

  // Members : 
  FETCH_MEMBERS: (departmentId: string) =>
    `${API_BASE_URL}/member/all/${departmentId}`,
  FETCH_MEMBERS_FOR_ADMIN: `${API_BASE_URL}/member/admin/all`,
  UPDATE_MEMBER_FOR_ADMIN: (idUser: string) =>
    `${API_BASE_URL}/member/update/${idUser}`,
  DELETE_MEMBER_FOR_ADMIN: (idUser: string | number) =>
    `${API_BASE_URL}/member/delete/${idUser}`,
  ADD_MEMBER_FOR_ADMIN: `${API_BASE_URL}/member/create`
}
