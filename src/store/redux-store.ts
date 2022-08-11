import { configureStore, combineReducers } from '@reduxjs/toolkit'

import navbarReducer from './Reducers/NavbarReducer'

const rootReducer = combineReducers({
  navbar: navbarReducer,

})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>