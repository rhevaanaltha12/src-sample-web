import MainLayout from '@/components/Layout/Main'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return <MainLayout>{children}</MainLayout>
}

export default DashboardLayout
