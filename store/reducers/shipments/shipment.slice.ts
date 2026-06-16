import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import { dummyShipments } from '@/features/Shipments/config/config'

interface IState {
   shipments: any[]
   loading: boolean
   error: null | { type: string; message: string }
   isCreate: boolean
   formData: any
}

const initialState: IState = {
   shipments: dummyShipments,
   loading: false,
   isCreate: false,
   error: null,
   formData: null,
}

export const shipmentsSlice = createSlice({
   name: 'shipments',
   initialState,
   reducers: {
      setShipments: (state, action: PayloadAction<any>) => {
         return { ...state, ...action.payload }
      },
      getShipmentDetail: (state, action) => {
         return {
            ...state,
            formData: state.shipments.find((s: any) => s.shipid === action.payload) ?? null,
         }
      },
      addShipment: (state, action: PayloadAction<any>) => {
         state.shipments = [action.payload, ...state.shipments]
      },
      updateShipment: (state, action: PayloadAction<any>) => {
         const idx = state.shipments.findIndex((s: any) => s.shipid === action.payload.shipid)
         if (idx !== -1) state.shipments[idx] = action.payload
      },
      deleteShipment: (state, action: PayloadAction<string>) => {
         state.shipments = state.shipments.filter((s: any) => s.shipid !== action.payload)
      },
   },
})

export const { setShipments, getShipmentDetail, addShipment, updateShipment, deleteShipment } = shipmentsSlice.actions
export const selectShipments = (state: RootState) => state.shipmentReducer
export default shipmentsSlice.reducer
