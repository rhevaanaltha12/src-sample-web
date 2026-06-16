import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import { dummyCustomers } from '@/features/Customers/config/config'

interface IState {
   customers: any[]
   loading: boolean
   error: null | { type: string; message: string }
   isCreate: boolean
   formData: any
}

const initialState: IState = {
   customers: dummyCustomers,
   loading: false,
   isCreate: false,
   error: null,
   formData: null,
}

export const customersSlice = createSlice({
   name: 'customers',
   initialState,
   reducers: {
      setCustomers: (state, action: PayloadAction<any>) => {
         return { ...state, ...action.payload }
      },
      getCustomerDetail: (state, action) => {
         return {
            ...state,
            formData: state.customers.find((c: any) => c.custid === action.payload) ?? null,
         }
      },
      addCustomer: (state, action: PayloadAction<any>) => {
         state.customers = [action.payload, ...state.customers]
      },
      updateCustomer: (state, action: PayloadAction<any>) => {
         const idx = state.customers.findIndex((c: any) => c.custid === action.payload.custid)
         if (idx !== -1) state.customers[idx] = action.payload
      },
      deleteCustomer: (state, action: PayloadAction<string>) => {
         state.customers = state.customers.filter((c: any) => c.custid !== action.payload)
      },
   },
})

export const { setCustomers, getCustomerDetail, addCustomer, updateCustomer, deleteCustomer } = customersSlice.actions
export const selectCustomers = (state: RootState) => state.customerReducer
export default customersSlice.reducer
