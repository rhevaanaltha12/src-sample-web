'use client'

import Button from '@/components/Button'
import FieldPassword from '@/components/Form/FieldPassword'
import FieldText from '@/components/Form/FieldText'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { notificationToast } from '@/components/Toast'
import { Toast } from 'primereact/toast'

export const validationSchema = yup.object().shape({
   username: yup.string().required('Username is required'),
   password: yup.string().required('Password is required'),
})

export default function Home() {
   const toast = useRef(null)
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)
   const hooks = useForm({ defaultValues: { username: '', password: '' }, resolver: yupResolver(validationSchema) })

   const {
      handleSubmit,
      formState: { isSubmitting },
   } = hooks

   const onSubmit = handleSubmit(async (data) => {
      setIsLoading(true)

      setTimeout(() => {
         setIsLoading(false)
      }, 800)

      notificationToast({
         toast: toast?.current,
         severity: 'info',
         summary: 'Success',
         detail: 'Login Successfully.',
         sticky: true,
         closable: false,
      })
      setTimeout(() => {
         router.push('/dashboard')
      }, 3000)
   })

   return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-c-blue-10 via-c-primary-10 to-c-violet-10 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
         {/* Decorative Background Elements */}
         <Toast ref={toast} />
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-c-primary-30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
         <div
            className="absolute top-1/4 -right-24 w-96 h-96 bg-c-blue-30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"
            style={{ animationDelay: '2s' }}
         ></div>
         <div
            className="absolute -bottom-24 left-1/3 w-96 h-96 bg-c-violet-30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"
            style={{ animationDelay: '4s' }}
         ></div>

         <div className="z-10 bg-white/80 backdrop-blur-xl w-full max-w-105 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 border border-white/60">
            <div className="flex flex-col items-center mb-10">
               <div className="w-16 h-16 bg-linear-to-tr from-c-primary-60 to-c-blue-50 rounded-2xl flex items-center justify-center shadow-lg mb-6 text-white hover:scale-105 transition-transform duration-300">
                  <i className="pi pi-sparkles text-2xl"></i>
               </div>
               <h1 className="text-center text-c-neutral-90 font-bold text-3xl tracking-tight">Welcome Back</h1>
               <p className="text-c-neutral-50 text-sm mt-3 text-center">Please enter your details to sign in</p>
            </div>

            <FormProvider {...hooks}>
               <div className="space-y-1">
                  <FieldText name="username" label="Username" isRequired placeholder="Enter your username" />
                  <FieldPassword
                     name="password"
                     label="Password"
                     isRequired
                     placeholder="Enter your password"
                     feedback={false}
                     toggleMask
                  />
               </div>

               <div className="flex items-center justify-between mt-2 mb-8">
                  <div className="flex items-center">
                     <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-c-primary-60 focus:ring-c-primary-50 border-c-neutral-30 rounded cursor-pointer transition-colors"
                     />
                     <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-c-neutral-60 cursor-pointer">
                        Remember me
                     </label>
                  </div>
                  <div className="text-xs">
                     <a
                        href="/forgot-password"
                        className="font-semibold text-c-primary-60 hover:text-c-primary-80 transition-colors"
                     >
                        Forgot password?
                     </a>
                  </div>
               </div>

               <div className="mt-8">
                  <Button
                     label="Sign In"
                     size="lg"
                     className="w-full "
                     theme="primary"
                     isLoading={isLoading}
                     onClick={onSubmit}
                  />
               </div>

               <div className="mt-8 text-center text-xs font-medium text-c-neutral-50">
                  Don't have an account?{' '}
                  <a href="/register" className="font-semibold text-c-primary-60 hover:text-c-primary-80 transition-colors">
                     Sign up now
                  </a>
               </div>
            </FormProvider>
         </div>
      </div>
   )
}
