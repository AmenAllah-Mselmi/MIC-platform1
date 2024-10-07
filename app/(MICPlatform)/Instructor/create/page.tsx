'use client'
import RichTextEditor from './../../_MICcomponents/RichTextEditor/RichTextEditor'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
function extractTextFromHTML(html) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc.body.textContent?.trim() || ''
}

const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().refine(
    value => {
      return extractTextFromHTML(value).trim().length >= 5
    },
    {
      message: 'The text must be at least 5 characters long after trimming'
    }
  )
})

export default function Create() {
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ''
    }
  })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className='mx-auto max-w-3xl pt-36 text-slate-700 w-11/12'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className='text-sm text-red-900' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={value => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage className='text-sm text-red-900' />
              </FormItem>
            )}
          />
          <Button className='mt-4'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
