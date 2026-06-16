'use client'

import Button from '@/components/Button'
import FieldPassword from '@/components/Form/FieldPassword'
import FieldText from '@/components/Form/FieldText'
import { notificationToast } from '@/components/Toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
   name: yup.string().required('Full name is required'),
   email: yup.string().email('Invalid email format').required('Email is required'),
   username: yup.string().required('Username is required'),
   password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
})

export default function Register() {
   const toast = useRef(null)
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)
   const hooks = useForm({
      defaultValues: { name: '', email: '', username: '', password: '' },
      resolver: yupResolver(validationSchema),
   })

   const { handleSubmit } = hooks

   const onSubmit = handleSubmit(async () => {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 800)
      notificationToast({
         toast: toast?.current,
         severity: 'success',
         summary: 'Success',
         detail: 'Account created successfully.',
      })
      setTimeout(() => router.push('/dashboard'), 1500)
   })

   return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-c-blue-10 via-c-primary-10 to-c-violet-10 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
         <Toast ref={toast} />
         {/* Decorative Background Elements */}
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-c-primary-30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
         <div className="absolute top-1/4 -right-24 w-96 h-96 bg-c-blue-30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
         <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-c-violet-30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>

         <div className="z-10 bg-white/80 backdrop-blur-xl w-full max-w-105 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 border border-white/60">
            <div className="flex flex-col items-center mb-10">
               <div className="w-16 h-16 bg-linear-to-tr from-c-primary-60 to-c-blue-50 rounded-2xl flex items-center justify-center shadow-lg mb-6 text-white hover:scale-105 transition-transform duration-300">
                  <i className="pi pi-user-plus text-2xl"></i>
               </div>
               <h1 className="text-center text-c-neutral-90 font-bold text-3xl tracking-tight">Create Account</h1>
               <p className="text-c-neutral-50 text-sm mt-3 text-center">Please fill in the details below to register</p>
            </div>

            <FormProvider {...hooks}>
               <div className="space-y-1">
                  <FieldText name="name" label="Full Name" isRequired placeholder="Enter your full name" />
                  <FieldText name="email" label="Email Address" isRequired placeholder="Enter your email" />
                  <FieldText name="username" label="Username" isRequired placeholder="Choose a username" />
                  <FieldPassword name="password" label="Password" isRequired placeholder="Create a password" feedback toggleMask />
               </div>

               <div className="mt-8">
                  <Button
                     label="Register"
                     size="lg"
                     className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl"
                     theme="primary"
                     isLoading={isLoading}
                     onClick={onSubmit}
                  />
               </div>

               <div className="mt-8 text-center text-xs font-medium text-c-neutral-50">
                  Already have an account?{' '}
                  <a href="/" className="font-semibold text-c-primary-60 hover:text-c-primary-80 transition-colors">
                     Back to login
                  </a>
               </div>
            </FormProvider>
         </div>
      </div>
   )
}
