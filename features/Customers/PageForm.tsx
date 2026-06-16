'use client'
import PageHeader from '@/components/PageHeader'
import PageLayout from '@/components/PageLayout'
import { useAppDispatch } from '@/store/hook'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { pageForm } from './config/page'
import { getCustomerDetail, setCustomers } from '@/store/reducers/customers/customer.slice'
import FormMain from './components/FormMain'

const PageForm = () => {
   const [pageOpt, setPageOpt] = useState<any>(null)
   const dispatch = useAppDispatch()
   const pathname = usePathname()
   const params = useParams()
   const isCreate = !pathname?.includes('/edit/')

   useEffect(() => {
      const formTitle = isCreate ? { status: 'Create', title: 'Create New Customer' } : { status: 'Edit', title: 'Edit Customer' }
      setPageOpt(pageForm(formTitle))
      dispatch(setCustomers({ isCreate, formData: null }))
      if (!isCreate && params?.id) dispatch(getCustomerDetail(params.id))
   }, [])

   return (
      <PageLayout pageTitle={pageOpt?.pageTitle} breadcrumbs={pageOpt?.breadcrumb}>
         <PageHeader title={pageOpt?.formTitle} styles="wrap-blue" />
         <FormMain />
      </PageLayout>
   )
}

export default PageForm
