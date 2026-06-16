'use client'
import FieldText from '@/components/Form/FieldText'
import FieldSelect from '@/components/Form/FieldSelect'
import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import { notificationToast, errorToast } from '@/components/Toast'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addShipment, updateShipment } from '@/store/reducers/shipments/shipment.slice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

const vehicleOptions = [
   { label: 'Truck', value: 'Truck' },
   { label: 'Pickup', value: 'Pickup' },
   { label: 'Motor', value: 'Motor' },
   { label: 'Van', value: 'Van' },
]

const priorityOptions = [
   { label: 'Normal', value: 'Normal' },
   { label: 'Express', value: 'Express' },
   { label: 'Urgent', value: 'Urgent' },
]

const statusOptions = [
   { label: 'Pending', value: 'Pending' },
   { label: 'In Transit', value: 'In Transit' },
   { label: 'Delivered', value: 'Delivered' },
   { label: 'Cancelled', value: 'Cancelled' },
]

const schema = yup.object({
   recipient: yup.string().required('Recipient is required'),
   origin: yup.string().required('Origin is required'),
   destination: yup.string().required('Destination is required'),
   weight: yup.string().required('Weight is required'),
   vehicletype: yup.string().required('Vehicle type is required'),
   priority: yup.string().required('Priority is required'),
   status: yup.string().required('Status is required'),
})

const FormMain = () => {
   const toast = useRef<Toast>(null)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const { isCreate, formData, shipments } = useAppSelector((state) => state.shipmentReducer)

   const hooks = useForm({
      defaultValues: { recipient: '', origin: '', destination: '', weight: '', vehicletype: '', priority: 'Normal', status: 'Pending' },
      resolver: yupResolver(schema),
   })

   const { handleSubmit, reset, formState: { isSubmitting } } = hooks

   useEffect(() => {
      if (!isCreate && formData) {
         reset({
            recipient: formData.recipient ?? '',
            origin: formData.origin ?? '',
            destination: formData.destination ?? '',
            weight: formData.weight ?? '',
            vehicletype: formData.vehicletype ?? '',
            priority: formData.priority ?? 'Normal',
            status: formData.status ?? 'Pending',
         })
      }
   }, [formData, isCreate])

   const onSubmit = handleSubmit(async (data) => {
      try {
         const newId = `SHP-${String(shipments.length + 1).padStart(3, '0')}`
         const today = new Date()
         const eta = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

         if (isCreate) {
            dispatch(addShipment({ shipid: newId, ...data, eta, notes: '' }))
         } else {
            dispatch(updateShipment({ ...formData, ...data }))
         }
         notificationToast({ toast: toast.current, severity: 'info', summary: 'Success', detail: isCreate ? 'Shipment created.' : 'Shipment updated.', sticky: true, closable: false })
         setTimeout(() => router.push('/dashboard/shipments'), 1200)
      } catch {
         errorToast(toast.current, 'Error', 'Something went wrong.')
      }
   })

   return (
      <>
         <Toast ref={toast} />
         <FormProvider {...hooks}>
            <form onSubmit={onSubmit}>
               <FormGroup title="Shipment Info" desc="Enter recipient and route details">
                  <FieldText name="recipient" label="Recipient Name" placeholder="Enter company or person name" isRequired />
                  <FieldText name="origin" label="Origin" placeholder="City of origin" isRequired />
                  <FieldText name="destination" label="Destination" placeholder="City of destination" isRequired />
               </FormGroup>

               <FormGroup title="Cargo Details" desc="Specify cargo weight and vehicle">
                  <FieldText name="weight" label="Weight (kg)" placeholder="e.g. 250" isRequired keyFilter="int" />
                  <FieldSelect name="vehicletype" label="Vehicle Type" placeholder="Select vehicle" isRequired options={vehicleOptions} />
                  <FieldSelect name="priority" label="Priority" placeholder="Select priority" isRequired options={priorityOptions} />
               </FormGroup>

               <FormGroup title="Status" desc="Current shipment status" useBorder={false}>
                  <FieldSelect name="status" label="Status" placeholder="Select status" isRequired options={statusOptions} />
               </FormGroup>

               <div className="flex justify-end gap-3 mt-6">
                  <Button label="Cancel" theme="normal" btnStyle="stroke" type="button" onClick={() => router.back()} />
                  <Button label={isCreate ? 'Create Shipment' : 'Save Changes'} theme="primary" type="submit" isLoading={isSubmitting} />
               </div>
            </form>
         </FormProvider>
      </>
   )
}

export default FormMain
