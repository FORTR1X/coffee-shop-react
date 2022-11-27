import React, {useEffect, useState} from "react"
import {AdminBrstSellersPropsType} from "./AdminBestSellersContainer"

import s from './AdminBestSellers.module.css'
import {BASE_URL} from "../../../hooks/useApi"

import editSvg from './../svg/edit.svg'
import deleteSvg from './../svg/delete.svg'
import {useLocation, useNavigate} from "react-router-dom"

const AdminBestSellers: React.FC<AdminBrstSellersPropsType> = (props: AdminBrstSellersPropsType) => {

    const IS_BEST_SELLERS_EMPTY = props.bestSellers.length == 0

    useEffect(() => {
        if (IS_BEST_SELLERS_EMPTY) {
            props.getBestSellers()
        }
    }, [props.bestSellers])

    const handleDeleteById = (id: number) => {
        props.deleteProductFromBestSellers(id)
    }

    const navigateTo = useNavigate()
    const handleNavigateToProduct = (id: number) => {
        navigateTo(`/product/id${id}`)
    }

    const [idInputValue, setIdInputValue] = useState<number>()
    const handleSetIdInputValue = (value: string) => {
        if (parseInt(value) > 0)
            setIdInputValue(parseInt(value))
    }

    const handleAddProductToBestSellers = () => {
        if (idInputValue !== undefined && idInputValue > 0)
            props.addProductToBestSellers(idInputValue)
    }

    return (
        <>
            {!IS_BEST_SELLERS_EMPTY &&
                <div className={s.content}>
                    <div className={s.container}>

                        <div>
                            {props.bestSellers.map((product, index) => {
                                return (
                                    <div onClick={() => {
                                        handleNavigateToProduct(product.id)
                                    }} className={s.product__container}>
                                        <img
                                            className={s.product__img}
                                            src={`${BASE_URL}/uploads/product/${product.id}/0.jpg`}
                                            alt={product.product.header}
                                        />

                                        <div className={s.product__info}>
                                            <div className={s.product__info_top}>
                                                <p>{product.product.header}</p>
                                                <p>{product.product.price} руб.</p>
                                            </div>
                                            <p>{product.product.description}</p>
                                        </div>

                                        <div className={s.product__btn_group}>
                                            <button type="button">
                                                <a href={`/admin/product/edit/id${product.id}`}>
                                                    <img className={s.btn__img} src={editSvg} alt="Редактировать"/>
                                                </a>
                                            </button>

                                            <button type="button" onClick={() => {
                                                handleDeleteById(product.id)
                                            }}>
                                                <img className={s.btn__img} src={deleteSvg} alt="Удалить"/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <p className={s.container__condition}>Максимум 5 товаров <span>*</span></p>

                        <div className={s.input__container}>
                            <input
                                className={s.input}
                                type="number"
                                placeholder="ID товара"
                                onChange={(event) => {
                                    handleSetIdInputValue(event.currentTarget.value)
                                }}
                                value={idInputValue}
                            />
                            <div
                                className={s.input__btn}
                                onClick={handleAddProductToBestSellers}
                            >
                                Добавить
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AdminBestSellers