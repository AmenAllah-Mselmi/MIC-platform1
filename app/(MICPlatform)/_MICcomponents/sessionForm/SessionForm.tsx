'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import DatePickerDemo from '@/components/ui/date-picker'

const sessionSchema = z.object({
  Title: z.string().nonempty({ message: 'Title is required' }),
  Description: z.string().nonempty({ message: 'Description is required' }),
  Date: z.date({ required_error: 'Date is required' }),
  Room: z.string().nonempty({ message: 'Room is required' }),
  Instructor: z.string().nonempty({ message: 'Instructor is required' })
})

export default function SessionForm() {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      Title: '',
      Description: '',
      Date: new Date(),
      Room: '',
      Instructor: ''
    }
  })

  const onSubmit = async data => {
    setLoading(true)
    try {
      console.log('Session Submitted', data)
      // Simulate an API call
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Submission failed:', error)
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col items-center justify-center rounded-xl border bg-slate-300 shadow-2xl'>
      <div className='w-full max-w-2xl rounded-lg bg-white p-8 shadow-md'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-6'
          >
            <FormField
              control={form.control}
              name='Title'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Description'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter description' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Date'
              render={({ field }) => (
                <FormItem className='col-span-1 flex flex-col'>
                  <FormLabel className='mb-3'>Date</FormLabel>
                  <FormControl>
                    <DatePickerDemo
                      selected={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Room'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter room' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Instructor'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Instructor</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger
                        className='rounded-md border border-gray-300 bg-white shadow-sm'
                        placeholder='Select instructor'
                      />
                      <SelectContent className='rounded-md border border-gray-300 bg-white shadow-lg'>
                        <SelectItem value='Instructor 1'>
                          Instructor 1
                        </SelectItem>
                        <SelectItem value='Instructor 2'>
                          Instructor 2
                        </SelectItem>
                        <SelectItem value='Instructor 3'>
                          Instructor 3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <div className='col-span-2'>
              <Button
                type='submit'
                className='h-12 w-full rounded-md bg-gradient-to-r from-secondary to-primary text-white'
              >
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
