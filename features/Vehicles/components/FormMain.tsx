'use client'
import FieldText from '@/components/Form/FieldText'
import FieldSelect from '@/components/Form/FieldSelect'
import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import { notificationToast, errorToast } from '@/components/Toast'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addVehicle, updateVehicle } from '@/store/reducers/vehicles/vehicle.slice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

const typeOptions = [
   { label: 'Truck', value: 'Truck' },
   { label: 'Pickup', value: 'Pickup' },
   { label: 'Motor', value: 'Motor' },
   { label: 'Van', value: 'Van' },
]
const statusOptions = [
   { label: 'Active', value: 'Active' },
   { label: 'On Route', value: 'On Route' },
   { label: 'Maintenance', value: 'Maintenance' },
]

const schema = yup.object({
   plate: yup.string().required('Plate number is required'),
   vhctype: yup.string().required('Vehicle type is required'),
   year: yup.string().required('Year is required'),
   capacity: yup.string().required('Capacity is required'),
   status: yup.string().required('Status is required'),
})

const FormMain = () => {
   const toast = useRef<Toast>(null)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const { isCreate, formData, vehicles } = useAppSelector((state) => state.vehicleReducer)

   const hooks = useForm({
      defaultValues: { plate: '', vhctype: '', year: '', capacity: '', status: 'Active' },
      resolver: yupResolver(schema),
   })

   const { handleSubmit, reset, formState: { isSubmitting } } = hooks

   useEffect(() => {
      if (!isCreate && formData) {
         reset({
            plate: formData.plate ?? '',
            vhctype: formData.vhctype ?? '',
            year: formData.year ?? '',
            capacity: formData.capacity ?? '',
            status: formData.status ?? 'Active',
         })
      }
   }, [formData, isCreate])

   const onSubmit = handleSubmit(async (data) => {
      try {
         const newId = `VHC-${String(vehicles.length + 1).padStart(3, '0')}`
         if (isCreate) {
            dispatch(addVehicle({ vhcid: newId, ...data }))
         } else {
            dispatch(updateVehicle({ ...formData, ...data }))
         }
         notificationToast({ toast: toast.current, severity: 'info', summary: 'Success', detail: isCreate ? 'Vehicle added.' : 'Vehicle updated.', sticky: true, closable: false })
         setTimeout(() => router.push('/dashboard/vehicles'), 1200)
      } catch {
         errorToast(toast.current, 'Error', 'Something went wrong.')
      }
   })

   return (
      <>
         <Toast ref={toast} />
         <FormProvider {...hooks}>
            <form onSubmit={onSubmit}>
               <FormGroup title="Vehicle Info" desc="Enter vehicle identification details">
                  <FieldText name="plate" label="Plate Number" placeholder="e.g. B 1234 AB" isRequired />
                  <FieldSelect name="vhctype" label="Vehicle Type" placeholder="Select type" isRequired options={typeOptions} />
                  <FieldText name="year" label="Year" placeholder="e.g. 2021" isRequired keyFilter="int" />
               </FormGroup>

               <FormGroup title="Specifications" desc="Load capacity details">
                  <FieldText name="capacity" label="Capacity (Ton)" placeholder="e.g. 5" isRequired keyFilter="int" />
               </FormGroup>

               <FormGroup title="Status" desc="Current vehicle availability" useBorder={false}>
                  <FieldSelect name="status" label="Status" placeholder="Select status" isRequired options={statusOptions} />
               </FormGroup>

               <div className="flex justify-end gap-3 mt-6">
                  <Button label="Cancel" theme="normal" btnStyle="stroke" type="button" onClick={() => router.back()} />
                  <Button label={isCreate ? 'Add Vehicle' : 'Save Changes'} theme="primary" type="submit" isLoading={isSubmitting} />
               </div>
            </form>
         </FormProvider>
      </>
   )
}

export default FormMain
