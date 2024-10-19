'use client'
import React, { useState } from 'react'
import { TypewriterEffectSmoothDemo } from '../typewriterEffect/TypewriterEffectSmoothDemo'
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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../../store/MyStore/AuthStore'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const login = useAuthStore(state => state.login)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    email: z
      .string()
      // .email({ message: 'Invalid email address' })
      // .min(10, { message: 'Your email must meet the email format' })
      .max(30),
    password: z
      .string()
      // .min(6, {
      //   message: 'Your password must be at least 6 characters'
      // })
      .max(30)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const user = useAuthStore(state => state.user)
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
       await login(data.email, data.password)
       
      if (!user) {
        throw new Error('User data not found after login')
      }

      if (user.role === 'member') {
        router.push('/Member/assignments')
      } else if (user.role === 'instructor') {
        router.push('/Instructor/assignments')
      } else {
        router.push('/SuperAdmin/add')
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col items-center justify-center rounded-xl border bg-slate-300 shadow-2xl'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <div className='mb-6 w-full text-center'>
          <TypewriterEffectSmoothDemo />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='mb-5'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='h-12 w-full rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
