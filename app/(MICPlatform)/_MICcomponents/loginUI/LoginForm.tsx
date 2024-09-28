'use client'
import React from 'react'
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

export default function LoginForm() {
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(10, { message: 'Your email must meet the email format' })
      .max(30),
    password: z
      .string()
      .min(6, {
        message: 'Your password must be at least 6 characters'
      })
      .max(30)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
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
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
