import { useEffect, useState } from 'react'
import axios from 'axios'
import { Controller } from 'react-hook-form'
import {
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Typography
} from '@mui/material'
import { ENDPOINTS } from '@/app/store/constants/api'

const DepartmentSelect = ({ form }) => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function to fetch instructors
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(ENDPOINTS.GET_DEPARTMENTS_NAMES_IDS)
      setDepartments(response.data.departments)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching departments:', error)
      setError('Error fetching departments')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments() // API call on component mount
  }, [])

  return (
    <Controller
      name='departments'
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth variant='outlined' margin='normal'>
          {/* Loading state */}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color='error'>{error}</Typography>
          ) : (
            <Select
              {...field} // Apply React Hook Form `field`
              onChange={e => field.onChange(e.target.value)} // Handle selection change
              value={field.value || ''} // Set selected value
              displayEmpty
            >
              <MenuItem value='' disabled>
                Select a department
              </MenuItem>
              {/* Map through instructors and display each as a MenuItem */}
              {departments.map(department => (
                <MenuItem key={department._id} value={department._id}>
                  {department.DepartmentName}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      )}
    />
  )
}

export default DepartmentSelect
