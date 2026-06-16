'use client'
import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { Provider } from 'react-redux'
import { store } from '@/store'

const PageProvider = ({ children }: { children: React.ReactNode }) => {
   return (
      <PrimeReactProvider>
         <Provider store={store}>{children}</Provider>
      </PrimeReactProvider>
   )
}

export default PageProvider
