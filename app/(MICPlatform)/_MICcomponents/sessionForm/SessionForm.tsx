'use client'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import DatePickerDemo from '@/components/ui/date-picker'
import { useSessionsStore } from '@/app/store/MyStore/SessionsStore'
import { toast } from 'react-toastify'

const sessionSchema = z.object({
  Title: z.string().nonempty({ message: 'Title is required' }),
  Description: z.string().nonempty({ message: 'Description is required' }),
  Date: z.date({ required_error: 'Date is required' }),
  Room: z.string().nonempty({ message: 'Room is required' }),
  Instructor: z.string().nonempty({ message: 'Instructor is required' })
})

export default function SessionForm({ editingSession, setEditingSession }) {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      _id: '',
      Title: '',
      Description: '',
      Date: new Date(),
      Room: '',
      Instructor: ''
    }
  })

  const fetchSessions = useSessionsStore(state => state.fetchSessions)
  const updateSession = useSessionsStore(state => state.updateSession)
  const addSession = useSessionsStore(state => state.addSession)

  useEffect(() => {
    if (editingSession) {
      form.reset({
        _id: editingSession._id,
        Title: editingSession.Title,
        Description: editingSession.Description,
        Date: new Date(editingSession.Date), // Convertir en objet Date
        Room: editingSession.Room,
        Instructor: editingSession.Instructor
      })
    }
  }, [editingSession, form])

  const handleSubmit = async data => {
    try {
      setLoading(true)
      console.log(data)
      if (editingSession) {
        await updateSession(editingSession._id, data)
        toast.success('Session mise à jour avec succès!', {
          position: 'top-center'
        })
      } else {
        await addSession(data)
        toast.success('Session ajoutée avec succès!', {
          position: 'top-center'
        })
      }

      await fetchSessions('670792e3ee0e13424434d371')
      form.reset()
      setEditingSession(null)
    } catch (error) {
      toast.error("Erreur lors de l'opération", { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col items-center justify-center rounded-xl border bg-slate-300 shadow-2xl'>
      <div className='w-full max-w-2xl rounded-lg bg-white p-8 shadow-md'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='grid grid-cols-2 gap-6 p-8'
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
                  <FormMessage>
                    {form.formState.errors.Title?.message}
                  </FormMessage>
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
                  <FormMessage>
                    {form.formState.errors.Description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Date'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Controller
                      name='Date'
                      control={form.control}
                      render={({ field }) => (
                        <DatePickerDemo
                          selected={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.Date?.message}
                  </FormMessage>
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
                  <FormMessage>
                    {form.formState.errors.Room?.message}
                  </FormMessage>
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
                    <Controller
                      name='Instructor'
                      control={form.control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className='rounded-md border border-gray-300 bg-white shadow-sm'>
                            <SelectValue placeholder='Select instructor' />
                          </SelectTrigger>
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
                      )}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.Instructor?.message}
                  </FormMessage>
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
