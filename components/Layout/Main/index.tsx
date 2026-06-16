'use client'

import React, { useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import { Toast } from 'primereact/toast'
import { useAppDispatch } from '@/store/hook'
import { setApp } from '@/store/reducers/authSlice'
import { useState } from 'react'
import PageLoader from '@/components/PageLoader'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
   const globalToast = useRef<Toast>(null)
   const dispatch = useAppDispatch()
   const [loading, setLoading] = useState(true)

   const checkLogin = async () => {
      setTimeout(() => {
         setLoading(false)
      }, 2000)
   }

   useEffect(() => {
      checkLogin()
   }, [])

   useEffect(() => {
      dispatch(
         setApp({
            toast: globalToast.current,
         })
      )
   }, [loading])

   if (loading) {
      return <PageLoader title="Please wait" />
   }

   return (
      <div className="flex h-screen overflow-hidden">
         <Sidebar />
         <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto bg-c-neutral-10 p-6">{children}</main>
         </div>
      </div>
   )
}

export default MainLayout
