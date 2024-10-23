'use client'

import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/MyStore/AuthStore'
import { ENDPOINTS } from '../../store/constants/api'
import axiosInstance from '../../axiosInstance'
import DepartmentCard from '../_MICcomponents/departmentCard/DepartmentCard'
import {useRouter} from 'next/navigation'
import { button } from '@nextui-org/theme'

interface Department {
  _id: string
  DepartmentName: string
  imgUrl: string
}
const departmentImages = {
  "Basic Web": "@/public/images/departments/basic-web.png",
  "Advanced Web": "@/public/images/departments/advanced-web.png",
  "Intermediate Web": "@/public/images/departments/intermediate-web.png",
  "AI": "@/public/images/departments/ml.png",
}

export default function Dashboard() {
   const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const departmentIds = useAuthStore(state => state.user?.DepartmentIds || []) 
  console.log('DepartmentIds:', departmentIds)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.GET_DEPARTMENTS_NAMES_IDS)
        setDepartments(response.data.departments)
      } catch (error) {
        console.error('Department fetching failed:', error)
      }
    }

    fetchDepartments()
  }, [])

  return (
    <div>
      <h1 className='text-3xl text-slate-900 mb-6'>Dashboard</h1>
      <div className="flex flex-col gap-4 md:flex-row w-full">
        { departmentIds.length === 0 ? <h2 className='text-xl text-slate-900'>No departments found</h2> : null }
        {departments
          .filter(department => departmentIds.includes(department._id) )
          .map(department => (
            <button key={department._id} onClick={() => router.push(`/Member/assignments`)} >
            <DepartmentCard 
             key={department._id} name={department.DepartmentName}
            imageUrl={departmentImages[department.DepartmentName]} />
            </button>
         
          ))}
      </div>
    </div>
  )
}
