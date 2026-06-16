'use client'
import FieldText from '@/components/Form/FieldText'
import FieldPassword from '@/components/Form/FieldPassword'
import FieldSelect from '@/components/Form/FieldSelect'
import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import { successToast, errorToast, notificationToast } from '@/components/Toast'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addUser, updateUser } from '@/store/reducers/users/user.slice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

const roleOptions = [
   { label: 'Admin', value: 'Admin' },
   { label: 'Manager', value: 'Manager' },
   { label: 'Supervisor', value: 'Supervisor' },
   { label: 'User', value: 'User' },
]

const statusOptions = [
   { label: 'Active', value: 'Active' },
   { label: 'Inactive', value: 'Inactive' },
]

const buildSchema = (isCreate: boolean) =>
   yup.object({
      usrname: yup.string().required('Name is required'),
      usrnip: yup.string().required('NIP is required').matches(/^\d+$/, 'NIP must be numeric'),
      usraccesslevel: yup.string().required('Role is required'),
      status: yup.string().required('Status is required'),
      password: isCreate
         ? yup.string().required('Password is required').min(6, 'Password minimum 6 characters')
         : yup.string().optional(),
   })

const FormMain = () => {
   const toast = useRef<Toast>(null)
   const router = useRouter()
   const dispatch = useAppDispatch()

   const { isCreate, formData, users } = useAppSelector((state) => state.userReducer)

   const hooks = useForm({
      defaultValues: {
         usrname: '',
         usrnip: '',
         usraccesslevel: '',
         status: '',
         password: '',
      },
      resolver: yupResolver(buildSchema(isCreate)),
   })

   const {
      handleSubmit,
      reset,
      formState: { isSubmitting },
   } = hooks

   useEffect(() => {
      if (!isCreate && formData) {
         reset({
            usrname: formData.usrname ?? '',
            usrnip: formData.usrnip ?? '',
            usraccesslevel: formData.usraccesslevel ?? '',
            status: formData.status ?? '',
            password: '',
         })
      }
   }, [formData, isCreate])

   const onSubmit = handleSubmit(async (data) => {
      try {
         if (isCreate) {
            const newId = `USR-${String(users.length + 1).padStart(3, '0')}`
            dispatch(
               addUser({
                  usruserid: newId,
                  usrname: data.usrname,
                  usrnip: data.usrnip,
                  usraccesslevel: data.usraccesslevel,
                  status: data.status,
               })
            )
            notificationToast({
               toast: toast?.current,
               severity: 'info',
               summary: 'Success',
               detail: 'User created successfully.',
               sticky: true,
               closable: false,
            })
         } else {
            dispatch(
               updateUser({
                  ...formData,
                  usrname: data.usrname,
                  usrnip: data.usrnip,
                  usraccesslevel: data.usraccesslevel,
                  status: data.status,
               })
            )
            notificationToast({
               toast: toast?.current,
               severity: 'info',
               summary: 'Success',
               detail: 'User updated successfully.',
               sticky: true,
               closable: false,
            })
         }
         setTimeout(() => router.push('/dashboard/users'), 1200)
      } catch {
         errorToast(toast.current, 'Error', 'Something went wrong.')
      }
   })

   return (
      <>
         <Toast ref={toast} />
         <FormProvider {...hooks}>
            <form onSubmit={onSubmit}>
               <FormGroup title="User Information" desc="Enter user personal details">
                  <FieldText name="usrname" label="Full Name" placeholder="Enter full name" isRequired />
                  <FieldText name="usrnip" label="NIP" placeholder="Enter NIP (numbers only)" isRequired keyFilter="int" />
               </FormGroup>

               <FormGroup title="Access & Status" desc="Set user role and account status">
                  <FieldSelect name="usraccesslevel" label="Role" placeholder="Select role" isRequired options={roleOptions} />
                  <FieldSelect name="status" label="Status" placeholder="Select status" isRequired options={statusOptions} />
               </FormGroup>

               {isCreate && (
                  <FormGroup title="Security" desc="Set initial login password" useBorder={false}>
                     <FieldPassword
                        name="password"
                        label="Password"
                        placeholder="Enter password"
                        isRequired
                        toggleMask
                        feedback={false}
                     />
                  </FormGroup>
               )}

               <div className="flex justify-end gap-3 mt-6">
                  <Button label="Cancel" theme="normal" btnStyle="stroke" type="button" onClick={() => router.back()} />
                  <Button
                     label={isCreate ? 'Create User' : 'Save Changes'}
                     theme="primary"
                     type="submit"
                     isLoading={isSubmitting}
                  />
               </div>
            </form>
         </FormProvider>
      </>
   )
}

export default FormMain
