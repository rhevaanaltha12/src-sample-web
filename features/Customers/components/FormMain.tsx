'use client'
import FieldText from '@/components/Form/FieldText'
import FieldSelect from '@/components/Form/FieldSelect'
import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import { notificationToast, errorToast } from '@/components/Toast'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addCustomer, updateCustomer } from '@/store/reducers/customers/customer.slice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

const typeOptions = [
   { label: 'Corporate', value: 'Corporate' },
   { label: 'Individual', value: 'Individual' },
]
const statusOptions = [
   { label: 'Active', value: 'Active' },
   { label: 'Inactive', value: 'Inactive' },
]

const schema = yup.object({
   custname: yup.string().required('Name is required'),
   custtype: yup.string().required('Type is required'),
   phone: yup.string().required('Phone is required'),
   email: yup.string().email('Invalid email').required('Email is required'),
   address: yup.string().required('Address is required'),
   status: yup.string().required('Status is required'),
})

const FormMain = () => {
   const toast = useRef<Toast>(null)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const { isCreate, formData, customers } = useAppSelector((state) => state.customerReducer)

   const hooks = useForm({
      defaultValues: { custname: '', custtype: '', phone: '', email: '', address: '', status: 'Active' },
      resolver: yupResolver(schema),
   })

   const { handleSubmit, reset, formState: { isSubmitting } } = hooks

   useEffect(() => {
      if (!isCreate && formData) {
         reset({
            custname: formData.custname ?? '',
            custtype: formData.custtype ?? '',
            phone: formData.phone ?? '',
            email: formData.email ?? '',
            address: formData.address ?? '',
            status: formData.status ?? 'Active',
         })
      }
   }, [formData, isCreate])

   const onSubmit = handleSubmit(async (data) => {
      try {
         const newId = `CST-${String(customers.length + 1).padStart(3, '0')}`
         if (isCreate) {
            dispatch(addCustomer({ custid: newId, ...data, totalorders: 0 }))
         } else {
            dispatch(updateCustomer({ ...formData, ...data }))
         }
         notificationToast({ toast: toast.current, severity: 'info', summary: 'Success', detail: isCreate ? 'Customer created.' : 'Customer updated.', sticky: true, closable: false })
         setTimeout(() => router.push('/dashboard/customers'), 1200)
      } catch {
         errorToast(toast.current, 'Error', 'Something went wrong.')
      }
   })

   return (
      <>
         <Toast ref={toast} />
         <FormProvider {...hooks}>
            <form onSubmit={onSubmit}>
               <FormGroup title="Customer Information" desc="Enter customer name and type">
                  <FieldText name="custname" label="Full Name / Company" placeholder="Enter name or company" isRequired />
                  <FieldSelect name="custtype" label="Customer Type" placeholder="Select type" isRequired options={typeOptions} />
               </FormGroup>

               <FormGroup title="Contact Details" desc="Phone, email, and address">
                  <FieldText name="phone" label="Phone" placeholder="e.g. 08123456789" isRequired />
                  <FieldText name="email" label="Email" placeholder="Enter email address" isRequired />
                  <FieldText name="address" label="Address" placeholder="Enter full address" isRequired />
               </FormGroup>

               <FormGroup title="Account Status" desc="Set customer account status" useBorder={false}>
                  <FieldSelect name="status" label="Status" placeholder="Select status" isRequired options={statusOptions} />
               </FormGroup>

               <div className="flex justify-end gap-3 mt-6">
                  <Button label="Cancel" theme="normal" btnStyle="stroke" type="button" onClick={() => router.back()} />
                  <Button label={isCreate ? 'Create Customer' : 'Save Changes'} theme="primary" type="submit" isLoading={isSubmitting} />
               </div>
            </form>
         </FormProvider>
      </>
   )
}

export default FormMain
