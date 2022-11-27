import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {useEffectOnce} from "usehooks-ts"

const PAGE = 'page'
const PRICE_FROM = 'priceFrom'
const PRICE_TO = 'priceTo'
const SORT = 'sort'

type ValueSearchParamsType = {
    page: string
    priceFrom: string
    priceTo: string
    sort: string
}

const useSearchParam = () => {
    const [valueSearchParams, setValueSearchParams] = useState<ValueSearchParamsType>({
        page: '',
        priceFrom: '',
        priceTo: '',
        sort: ''
    })
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {

    }, [])

    const setPage = (page: string): void => {
        setValueSearchParams({...valueSearchParams, page})
        setSearchParams({...valueSearchParams, page})
    }

    const getPage = (): string | null => {
        return searchParams.get(PAGE)
    }

    const setPriceFrom = (priceFrom: string) => {
        setValueSearchParams({...valueSearchParams, priceFrom})
        setSearchParams({...valueSearchParams, priceFrom})
    }
    const getPriceFrom = (): string | null => {
        return searchParams.get(PRICE_FROM)
    }

    const setPriceTo = (priceTo: string) => {
        setValueSearchParams({...valueSearchParams, priceTo})
        setSearchParams({...valueSearchParams, priceTo})
    }
    const getPriceTo = (): string | null => {
        return searchParams.get(PRICE_TO)
    }

    const setPrice = (priceFrom: string, priceTo: string) => {
        setValueSearchParams({...valueSearchParams, priceFrom, priceTo})
        setSearchParams({...valueSearchParams, priceFrom, priceTo})
    }

    const setSort = (sort: string) => {
        setValueSearchParams({...valueSearchParams, sort})
        setSearchParams({...valueSearchParams, sort})
    }
    const getSort = (): string | null => {
        return searchParams.get(SORT)
    }

    return {getPage, setPage, getPriceFrom, setPriceFrom, getPriceTo, setPriceTo, getSort, setSort, setPrice}
}

export default useSearchParam