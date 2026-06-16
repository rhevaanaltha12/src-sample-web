'use client'
import PageHeader from '@/components/PageHeader'
import PageLayout from '@/components/PageLayout'
import { useAppDispatch } from '@/store/hook'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { pageForm } from './config/page'
import { getShipmentDetail, setShipments } from '@/store/reducers/shipments/shipment.slice'
import FormMain from './components/FormMain'

const PageForm = () => {
   const [pageOpt, setPageOpt] = useState<any>(null)
   const dispatch = useAppDispatch()
   const pathname = usePathname()
   const params = useParams()

   const isCreate = !pathname?.includes('/edit/')

   useEffect(() => {
      const formTitle = isCreate ? { status: 'Create', title: 'Create New Shipment' } : { status: 'Edit', title: 'Edit Shipment' }
      setPageOpt(pageForm(formTitle))
      dispatch(setShipments({ isCreate, formData: null }))
      if (!isCreate && params?.id) dispatch(getShipmentDetail(params.id))
   }, [])

   return (
      <PageLayout pageTitle={pageOpt?.pageTitle} breadcrumbs={pageOpt?.breadcrumb}>
         <PageHeader title={pageOpt?.formTitle} styles="wrap-blue" />
         <FormMain />
      </PageLayout>
   )
}

export default PageForm
