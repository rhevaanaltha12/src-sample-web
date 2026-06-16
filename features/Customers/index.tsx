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
import { deleteCustomer } from '@/store/reducers/customers/customer.slice'

const PageMain = () => {
   const { customers } = useAppSelector((state) => state.customerReducer)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const toast = useRef<Toast>(null)

   const handleDelete = (row: any) => {
      confirmDelete({
         toast: toast.current,
         label: row?.custname,
         method: async () => dispatch(deleteCustomer(row?.custid)),
      })
   }

   return (
      <PageLayout
         pageTitle="Customer Management"
         breadcrumbs={[
            { label: 'Dashboard', url: '/dashboard' },
            { label: 'Customer Management', url: '/dashboard/customers' },
         ]}
      >
         <Toast ref={toast} />
         <ConfirmDialog />
         <DataTable
            data={customers}
            {...tableOptions({
               handleCreate: () => router.push('/dashboard/customers/create'),
               handleEdit: (row: any) => router.push('/dashboard/customers/edit/' + row?.custid),
               handleDelete,
            })}
         />
      </PageLayout>
   )
}

export default PageMain
