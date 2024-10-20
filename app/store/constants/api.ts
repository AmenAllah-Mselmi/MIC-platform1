export const API_BASE_URL = 'http://localhost:4000/api'
export const ENDPOINTS = {
  // Assignments :
  FETCH_ASSIGNMENTS: (departmentId: string) =>
    `${API_BASE_URL}/member/department/${departmentId}`,

  // Sessions :
  FETCH_SESSIONS_BY_DEPARTMENT: (DepartmentId: string) =>
    `${API_BASE_URL}/session/department/${DepartmentId}`,
  UPDATE_SESSION: `${API_BASE_URL}/session/Instructor_modify_Session_In_department/`,
  ADD_SESSION: `${API_BASE_URL}/session/add-session-in-department/`,
  GET_INSTRUCTORS_NAMES: `${API_BASE_URL}/instructor/get-instructors-names`,

  // Members :
  FETCH_MEMBERS: (departmentId: string) =>
    `${API_BASE_URL}/member/all/${departmentId}`,
  FETCH_MEMBERS_FOR_ADMIN: `${API_BASE_URL}/member/admin/all`,
  UPDATE_MEMBER_FOR_ADMIN: (idUser: string) =>
    `${API_BASE_URL}/member/update/${idUser}`,
  DELETE_MEMBER_FOR_ADMIN: (idUser: string | number) =>
    `${API_BASE_URL}/member/delete/${idUser}`,
  DELETE_SESSION_FOR_INSTRUCTOR: (idSession: string | number) =>
    `${API_BASE_URL}/session/${idSession}`,
  ADD_MEMBER_FOR_ADMIN: `${API_BASE_URL}/member/create`,

  LOGIN: `${API_BASE_URL}/user/login`,
  LOGOUT: `${API_BASE_URL}/user/logout`
}
