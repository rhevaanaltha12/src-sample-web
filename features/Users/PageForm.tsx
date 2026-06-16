'use client'
import PageHeader from '@/components/PageHeader'
import PageLayout from '@/components/PageLayout'
import { useAppDispatch } from '@/store/hook'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { pageForm } from './config/page'
import { getDetail, setUsers } from '@/store/reducers/users/user.slice'
import FormMain from './components/FormMain'

const PageForm = () => {
   const [pageOpt, setPageOpt] = useState<any>(null)
   const dispatch = useAppDispatch()
   const pathname = usePathname()
   const params = useParams()

   const handleFormAction = (path: any): string => {
      if (path?.includes('create')) {
         return 'CREATE'
      } else if (path?.includes('/edit/')) {
         return 'EDIT'
      } else {
         return 'CREATE'
      }
   }

   const handleFormTitle: any = (form: any) => {
      if (form == 'CREATE') {
         return { status: 'Create', title: 'Create New User' }
      } else if (form == 'EDIT') {
         return { status: 'Edit', title: 'Edit User' }
      }
   }

   useEffect(() => {
      const formAction: string = handleFormAction(pathname)
      const isCreateNew = formAction === 'CREATE'
      setPageOpt(pageForm(handleFormTitle(formAction)))

      dispatch(setUsers({ isCreate: isCreateNew, formData: null }))

      if (!isCreateNew && params?.id) {
         dispatch(getDetail(params.id))
      }
   }, [])

   return (
      <PageLayout pageTitle={pageOpt?.pageTitle} breadcrumbs={pageOpt?.breadcrumb}>
         <PageHeader title={pageOpt?.formTitle} styles="wrap-green" />
         <FormMain />
      </PageLayout>
   )
}

export default PageForm
