import { configureStore, combineReducers } from '@reduxjs/toolkit'
import bestSellersReducer from './Reducers/BestSellersReducer'

import navbarReducer from './Reducers/NavbarReducer'
import pageProductReducer from './Reducers/PageProductReducer'
import urlReducer from './Reducers/UrlReducer'

const rootReducer = combineReducers({
  navbar: navbarReducer,
  url: urlReducer,
  bestSellers: bestSellersReducer,
  pageProduct: pageProductReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>