import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import { dummyVehicles } from '@/features/Vehicles/config/config'

interface IState {
   vehicles: any[]
   loading: boolean
   error: null | { type: string; message: string }
   isCreate: boolean
   formData: any
}

const initialState: IState = {
   vehicles: dummyVehicles,
   loading: false,
   isCreate: false,
   error: null,
   formData: null,
}

export const vehiclesSlice = createSlice({
   name: 'vehicles',
   initialState,
   reducers: {
      setVehicles: (state, action: PayloadAction<any>) => {
         return { ...state, ...action.payload }
      },
      getVehicleDetail: (state, action) => {
         return {
            ...state,
            formData: state.vehicles.find((v: any) => v.vhcid === action.payload) ?? null,
         }
      },
      addVehicle: (state, action: PayloadAction<any>) => {
         state.vehicles = [action.payload, ...state.vehicles]
      },
      updateVehicle: (state, action: PayloadAction<any>) => {
         const idx = state.vehicles.findIndex((v: any) => v.vhcid === action.payload.vhcid)
         if (idx !== -1) state.vehicles[idx] = action.payload
      },
      deleteVehicle: (state, action: PayloadAction<string>) => {
         state.vehicles = state.vehicles.filter((v: any) => v.vhcid !== action.payload)
      },
   },
})

export const { setVehicles, getVehicleDetail, addVehicle, updateVehicle, deleteVehicle } = vehiclesSlice.actions
export const selectVehicles = (state: RootState) => state.vehicleReducer
export default vehiclesSlice.reducer
