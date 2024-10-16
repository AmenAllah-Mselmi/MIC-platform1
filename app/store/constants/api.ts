import UpdateDepartement from "@/app/(MICPlatform)/_MICcomponents/CRUDDepartement/updateModal"

export const API_BASE_URL = 'http://localhost:4000/api'
export const ENDPOINTS = {
  FETCH_SESSIONS_BY_DEPARTMENT: (departmentId: string) =>
    `${API_BASE_URL}/instructor/department/${departmentId}`,
  FETCH_MEMBERS: (departmentId: string) =>
    `${API_BASE_URL}/member/all/${departmentId}`,
  FETCH_ASSIGNMENTS: (departmentId: string) =>
    `${API_BASE_URL}/member/department/${departmentId}`,
  FETCH_DEPARTEMENTS: () =>
    `${API_BASE_URL}/department/all`,
  CREATE_DEPARTEMENT: () =>
    `${API_BASE_URL}/department/create`,
  UPDATE_DEPARTEMENT: (departmentId: string) => `${API_BASE_URL}/department/update/${departmentId}`,
  DELETE_DEPARTEMENT: (departmentId: string) => `${API_BASE_URL}/department/delete/${departmentId}`,
  FETCH_INSTRUCTORS: () =>
    `${API_BASE_URL}/instructor/all`,
  CREATE_INSTRUCTOR: () =>
    `${API_BASE_URL}/instructor/create-with-department`,
  UPDATE_INSTRUCTOR: (instructorId: string) => `${API_BASE_URL}/instructor/update/${instructorId}`,
  DELETE_INSTRUCTOR: (instructorId: string) => `${API_BASE_URL}/instructor/delete/${instructorId}`
}

