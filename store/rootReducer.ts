import { combineReducers } from 'redux'
import authReducer from './reducers/authSlice'
import appReducer from './reducers/appSlice'
import menuReducer from './reducers/menuSlice'
import sidebarReducer from './reducers/sidebarSlice'
import dataTableReducer from './reducers/dataTableSlice'
import stepperReducer from './reducers/stepperSlice'
import queryReducer from './reducers/querySlice'
import userReducer from './reducers/users/user.slice'
import shipmentReducer from './reducers/shipments/shipment.slice'
import customerReducer from './reducers/customers/customer.slice'
import vehicleReducer from './reducers/vehicles/vehicle.slice'

const rootReducer = combineReducers({
   appReducer,
   authReducer,
   menuReducer,
   sidebarReducer,
   dataTableReducer,
   stepperReducer,
   queryReducer,
   userReducer,
   shipmentReducer,
   customerReducer,
   vehicleReducer,
})

export default rootReducer
