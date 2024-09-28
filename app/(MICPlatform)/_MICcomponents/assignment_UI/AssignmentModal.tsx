import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

export default function AssignmentModal({ isOpen, onOpenChange }) {
  return (
    <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col'>Modal Title</ModalHeader>
            <ModalBody className='flex w-full flex-col p-4'>
              <div className='flex w-full flex-col items-start justify-start space-y-4 md:space-x-4 md:space-y-0'>
                <div className='mb-4 flex w-full items-start justify-start gap-4 md:mb-0'>
                  <Image
                    src={'/images/Member/MemberBackground.png'}
                    alt='Instructor'
                    className='h-16 w-16 rounded-full'
                    width={64}
                    height={64}
                  />
                  <div className='mb-2 flex-1 text-start'>
                    <h5 className='text-start text-lg font-extrabold'>
                      Instructor
                    </h5>
                    <h6 className='text-sm text-gray-500'>20 Sep</h6>
                    <p className='mt-2 w-full text-sm text-gray-700 md:text-base'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quibusdam eligendi neque reiciendis sunt laborum nobis.
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quibusdam eligendi neque reiciendis sunt laborum nobis.
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quibusdam eligendi neque reiciendis sunt laborum nobis.
                    </p>
                    <Link
                      href={'#'}
                      className='mt-2 inline-block text-primary hover:underline'
                    >
                      Link for some resources
                    </Link>
                  </div>
                </div>
                <div className='flex w-full items-center gap-3 px-3'>
                  <Image
                    src={'/images/Member/MemberBackground.png'}
                    alt='Person'
                    className='m-0 h-12 w-12 self-center rounded-full'
                    width={48}
                    height={48}
                  />
                  <Input
                    placeholder='Submit your your github repo link here'
                    className='max-w-3/4 mt-2 rounded-lg border border-solid border-gray-400 md:w-full'
                  />
                  <Button
                    color='primary'
                    variant='light'
                    className='mt-2 px-1 py-3 md:w-auto'
                  >
                    <Send size={24} />
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-start'></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
