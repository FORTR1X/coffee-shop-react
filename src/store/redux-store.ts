import { applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import navbarReducer from './Reducers/NavbarReducer';

export const rootReducer = configureStore({
  reducer: {
    navbar: navbarReducer
  },
})

export type RootState = ReturnType<typeof rootReducer.getState>