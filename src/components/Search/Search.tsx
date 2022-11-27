import {useEffect} from "react"
import {useSearchParams} from "react-router-dom"
import {PropsSearchType} from "./SearchContainer"

import s from './Search.module.css'
import Product from "../Product/Product"


const Search: React.FC<PropsSearchType> = (props: PropsSearchType) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const request = searchParams.get('q')

    const PRODUCT_LIST_COUNT = props.productList.length
    const RESPONSE_STATUS = props.responseStatus

    const isResponseSuccessfully = RESPONSE_STATUS == 200
    const isResponseFailed = RESPONSE_STATUS > 0 && RESPONSE_STATUS !== 200
    const isProductListEmpty = PRODUCT_LIST_COUNT == 0

    useEffect(() => {
        if (isProductListEmpty && !isResponseSuccessfully && request !== null)
            props.getSearchProducts(request)

    }, [props.productList])

    return (
        <div className={s.search__wrapper}>
            {isResponseFailed &&
                <div className={s.failed__loading}>
                    <h3 className={s.failed__header}>Ошибка</h3>
                    <span className={s.failed__status}>{props.responseStatus}</span>
                    <span className={s.failed__description}>Обратитесь в поддержку:
            <a href="https://vk.com/f0rtrix" className={s.failed__link}>
              vk/f0rtrix
            </a>
          </span>
                </div>
            }

            {isResponseSuccessfully && isProductListEmpty &&
                <div className={s.not_found}>
                    <span className={s.not_found__header}>Товаров, соответствующих вашему запросу, не обнаружено.</span>
                </div>
            }

            {isResponseSuccessfully && !isProductListEmpty &&
                <div className={s.search_products__wrapper}>
                    <div className={s.search_products__container}>

                        <h3 className={s.search_products__header}>Результат поиска</h3>
                        <div className={s.search_products}>
                            {props.productList.map((product, index) => {
                                return (
                                    <Product key={index} product={product} productList={props.productList}/>
                                )
                            })}
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default Search