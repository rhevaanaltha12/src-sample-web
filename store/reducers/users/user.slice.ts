import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import { dummyUsers } from '@/features/Users/config/config'

interface IState {
   users: any[]
   // sessions: any
   loading: boolean
   error: null | { type: string; message: string }
   notification: null | Notification
   isCreate: boolean
   formData: any
}

const initialState: IState = {
   notification: null,
   // sessions: null,
   users: dummyUsers,
   loading: false,
   isCreate: false,
   error: null,
   formData: null,
}

export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      setUsers: (state, action: PayloadAction<any>) => {
         return {
            ...state,
            ...action.payload,
         }
      },
      getDetail: (state, action) => {
         return {
            ...state,
            formData: state?.users?.find((user: any) => user.usruserid === action.payload),
         }
      },
      addUser: (state, action: PayloadAction<any>) => {
         state.users = [action.payload, ...state.users]
      },
      updateUser: (state, action: PayloadAction<any>) => {
         const idx = state.users.findIndex((u: any) => u.usruserid === action.payload.usruserid)
         if (idx !== -1) state.users[idx] = action.payload
      },
      deleteUser: (state, action: PayloadAction<string>) => {
         state.users = state.users.filter((u: any) => u.usruserid !== action.payload)
      },
   },
})

export const { setUsers, getDetail, addUser, updateUser, deleteUser } = usersSlice.actions
export const selectUsers = (state: RootState) => state.userReducer
export default usersSlice.reducer
