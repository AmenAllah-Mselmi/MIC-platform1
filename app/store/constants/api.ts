export const API_BASE_URL = 'http://localhost:4000/api'
export const ENDPOINTS = {
  FETCH_SESSIONS_BY_DEPARTMENT: (departmentId: string) =>
    `${API_BASE_URL}/instructor/department/${departmentId}`,

  FETCH_MEMBERS: `${API_BASE_URL}/member/all`,
  FETCH_ASSIGNMENTS: (departmentId: string) =>
    `${API_BASE_URL}/member/department/${departmentId}`
}
