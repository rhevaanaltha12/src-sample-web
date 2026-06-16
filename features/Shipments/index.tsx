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
import { deleteShipment } from '@/store/reducers/shipments/shipment.slice'

const PageMain = () => {
   const { shipments } = useAppSelector((state) => state.shipmentReducer)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const toast = useRef<Toast>(null)

   const handleDelete = (row: any) => {
      confirmDelete({
         toast: toast.current,
         label: row?.shipid,
         method: async () => dispatch(deleteShipment(row?.shipid)),
      })
   }

   return (
      <PageLayout
         pageTitle="Shipment Management"
         breadcrumbs={[
            { label: 'Dashboard', url: '/dashboard' },
            { label: 'Shipment Management', url: '/dashboard/shipments' },
         ]}
      >
         <Toast ref={toast} />
         <ConfirmDialog />
         <DataTable
            data={shipments}
            {...tableOptions({
               handleCreate: () => router.push('/dashboard/shipments/create'),
               handleEdit: (row: any) => router.push('/dashboard/shipments/edit/' + row?.shipid),
               handleDelete,
            })}
         />
      </PageLayout>
   )
}

export default PageMain
