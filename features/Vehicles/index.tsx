'use client'
import { useRef } from 'react'
import PageLayout from '@/components/PageLayout'
import DataTable from '@/components/DataTable'
import { tableOptions } from './config/config'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDelete } from '@/components/Dialog'
import { deleteVehicle } from '@/store/reducers/vehicles/vehicle.slice'

const PageMain = () => {
   const { vehicles } = useAppSelector((state) => state.vehicleReducer)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const toast = useRef<Toast>(null)

   const handleDelete = (row: any) => {
      confirmDelete({
         toast: toast.current,
         label: row?.plate,
         method: async () => dispatch(deleteVehicle(row?.vhcid)),
      })
   }

   return (
      <PageLayout
         pageTitle="Fleet Management"
         breadcrumbs={[
            { label: 'Dashboard', url: '/dashboard' },
            { label: 'Fleet Management', url: '/dashboard/vehicles' },
         ]}
      >
         <Toast ref={toast} />
         <ConfirmDialog />
         <DataTable
            data={vehicles}
            {...tableOptions({
               handleCreate: () => router.push('/dashboard/vehicles/create'),
               handleEdit: (row: any) => router.push('/dashboard/vehicles/edit/' + row?.vhcid),
               handleDelete,
            })}
         />
      </PageLayout>
   )
}

export default PageMain
