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
import { deleteUser } from '@/store/reducers/users/user.slice'

const PageMain = () => {
   const { users } = useAppSelector((state) => state.userReducer)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const toast = useRef<Toast>(null)

   const handleDelete = (row: any) => {
      confirmDelete({
         toast: toast.current,
         label: row?.usrname,
         method: async () => dispatch(deleteUser(row?.usruserid)),
      })
   }

   return (
      <PageLayout
         pageTitle="User Management"
         breadcrumbs={[
            { label: 'Dashboard', url: '#' },
            { label: 'User Management', url: '/dashboard/users' },
         ]}
      >
         <Toast ref={toast} />
         <ConfirmDialog />
         <DataTable
            data={users}
            {...tableOptions({
               handleCreate: () => router.push('/dashboard/users/create'),
               handleEdit: (row: any) => router.push('/dashboard/users/edit/' + row?.usruserid),
               handleDelete,
            })}
         />
      </PageLayout>
   )
}

export default PageMain
