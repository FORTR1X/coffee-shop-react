import {ThunkAction} from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import {CategoryType, CompanyCategoryType, SubcategoryType} from "../../interfaces/interfaces"
import {
    NavbarActionTypes,
    setCartProductList,
    setCompanyCategories,
    setProductAllSubcategories,
    setProductCategories,
    setProductSubcategories,
    setSubcategoriesByCategory,
    setUser
} from "../Reducers/NavbarReducer"
import {
    UrlActionTypes,
    setCategoryAccessory,
    setCategoryCoffee,
    setCategoryTea,
    setCategoryTableware,
    setCompanyAbout,
    setCompanyOptovikam,
    setCompanyKontakti,
    setSubcatMonosorta,
    setSubcatSmesi,
    setSubcatCherniy,
    setSubcatZeleniy,
    setSubcatUlun,
    setSubcatBeliy,
    setSubcatPuer,
    setSubcatTravyanie,
    setSubcatKrasniy,
    setCompantDostavka
} from "../Reducers/UrlReducer"
import {RootState} from "../redux-store"

type AllActionsType = NavbarActionTypes | UrlActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getCompanyCategories = (): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi('GET', '/company-category')

        if (response.status == 200) {
            dispatch(setCompanyCategories(response.data))

            response.data.map((response: CompanyCategoryType) => {
                if (response.title == 'О компании')
                    dispatch(setCompanyAbout(response.url))
                if (response.title == 'Оптовикам')
                    dispatch(setCompanyOptovikam(response.url))
                if (response.title == 'Контакты')
                    dispatch(setCompanyKontakti(response.url))
                if (response.title == 'Доставка')
                    dispatch(setCompantDostavka(response.url))

            })
        }
    }
}

export const getProductCategories = (): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi('GET', '/categories')

        if (response.status == 200) {
            dispatch(setProductCategories(response.data))

            response.data.map((response: CategoryType) => {
                if (response.title == 'Кофе')
                    dispatch(setCategoryCoffee(response.url))
                if (response.title == 'Аксессуары')
                    dispatch(setCategoryAccessory(response.url))
                if (response.title == 'Чай')
                    dispatch(setCategoryTea(response.url))
                if (response.title == 'Посуда')
                    dispatch(setCategoryTableware(response.url))
            })
        }
    }
}

export const getProductSubcategories = (categoryId: number): ThunkAction<Promise<any>, RootState, unknown, AllActionsType> => {
    return async (dispatch, getState) => {
        let response = await useApi('GET', `/category/id${categoryId}/subcategories`)

        if (response.status == 200) {
            dispatch(setProductSubcategories(response.data))

            response.data.map((response: SubcategoryType) => {
                if (response.title == 'Моносорта')
                    dispatch(setSubcatMonosorta(response.url))
                if (response.title == 'Смеси')
                    dispatch(setSubcatSmesi(response.url))
                if (response.title == 'Чёрный')
                    dispatch(setSubcatCherniy(response.url))
                if (response.title == 'Зелёный')
                    dispatch(setSubcatZeleniy(response.url))
                if (response.title == 'Улун')
                    dispatch(setSubcatUlun(response.url))
                if (response.title == 'Белый')
                    dispatch(setSubcatBeliy(response.url))
                if (response.title == 'Пуэр')
                    dispatch(setSubcatPuer(response.url))
                if (response.title == 'Травяные')
                    dispatch(setSubcatTravyanie(response.url))
                if (response.title == 'Красный')
                    dispatch(setSubcatKrasniy(response.url))
            })
        }

        return response.data
    }
}

export const getUser = (userId?: number): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi('GET', userId == undefined ? '/admin' : `/user/id${userId}`)

        if (response.status == 200)
            dispatch(setUser(response.data))
    }
}

export const getAllSubcategories = (): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi('GET', '/subcategories')

        if (response.status == 200)
            dispatch(setProductAllSubcategories(response.data))
    }
}

export const getCartProductList = (productsId: Array<number>): ThunkActionType => {
    return async (dispatch, getState) => {
        let productsIdsForRequest: string = ''
        productsId.map((id) => {
            productsIdsForRequest = productsIdsForRequest + `id=${id}&`
        })
        let response = await useApi('GET', `/products-by-ids?${productsIdsForRequest}`)


        if (response.status == 200) {
            dispatch(setCartProductList(response.data))
        }
    }
}