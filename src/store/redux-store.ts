import {configureStore, combineReducers} from '@reduxjs/toolkit'
import adminBestSellersReducer from './Reducers/AdminBestSellersReducer'
import adminCreateProductReducer from './Reducers/AdminCreateProductReducer'
import adminEditProductReducer from './Reducers/AdminEditProductReducer'
import adminPanelReducer from './Reducers/AdminPanelReducer'
import adminStocksReducer from './Reducers/AdminStocksReducer'
import bestSellersReducer from './Reducers/BestSellersReducer'
import catalogReducer from './Reducers/CatalogReducer'
import checkoutReducer from './Reducers/CheckoutReducer'

import navbarReducer from './Reducers/NavbarReducer'
import OAuthReducer from './Reducers/OAuthReducer'
import pageProductReducer from './Reducers/PageProductReducer'
import searchReducer from './Reducers/SearchReducer'
import slidersReducer from './Reducers/SlidersReducer'
import urlReducer from './Reducers/UrlReducer'

const rootReducer = combineReducers({
    navbar: navbarReducer,
    url: urlReducer,
    bestSellers: bestSellersReducer,
    pageProduct: pageProductReducer,
    catalog: catalogReducer,
    search: searchReducer,
    checkout: checkoutReducer,
    OAuth: OAuthReducer,
    adminPanel: adminPanelReducer,
    adminCreateProduct: adminCreateProductReducer,
    adminEditProduct: adminEditProductReducer,
    adminBestSellers: adminBestSellersReducer,
    adminStocks: adminStocksReducer,
    sliders: slidersReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>