import { configureStore, combineReducers } from '@reduxjs/toolkit'

import navbarReducer from './Reducers/NavbarReducer'
import urlReducer from './Reducers/UrlReducer'

const rootReducer = combineReducers({
  navbar: navbarReducer,
  url: urlReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>