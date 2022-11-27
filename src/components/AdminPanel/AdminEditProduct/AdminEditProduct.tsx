import React, {useEffect, useState} from "react"
import {PropsAdminEditProduct} from "./AdminEditProductContainer"

import s from './AdminEditProduct.module.css'
import {useLocalStorage} from "usehooks-ts"
import {ProductRequestBodyType, SubcategoryType} from "../../../interfaces/interfaces"
import Input from "../../Checkout/Input/Input"
import {useParams} from "react-router-dom"

type OptionSelectType = {
    value: string
    option: string
}

const AdminEditProduct: React.FC<PropsAdminEditProduct> = (props: PropsAdminEditProduct) => {

    const [subcategoryOptions, setSubcategoryOptions] = useState<Array<OptionSelectType>>([])

    useEffect(() => {
        if (props.subcategories.length == 0) {
            props.getSubcategories()
        }

        if (props.subcategories.length > 0 && subcategoryOptions.length == 0) {
            let mappedSubcategoriesToOptionSubcategory: Array<OptionSelectType> = []

            props.subcategories.map((subcategory) => {
                mappedSubcategoriesToOptionSubcategory.push({
                    value: subcategory.id.toString(),
                    option: subcategory.title
                })
            })

            if (mappedSubcategoriesToOptionSubcategory.length > 0)
                setSubcategoryOptions(mappedSubcategoriesToOptionSubcategory)
        }
    }, [props.subcategories])

    const localToken = localStorage.getItem('token')
    const token = localToken == null ? '' : localToken
    const [refreshToken, setRefreshToken] = useLocalStorage('refresh-token', '')
    const IS_TOKEN_EMPTY = token !== undefined && token.length == 0

    const [titleValue, setTitleValue] = useState('')
    const handleSetTitleValue = (value: string) => {
        setTitleValue(value)
    }

    const [priceValue, setPriceValue] = useState('')
    const handleSetPriceValue = (value: string) => {
        if (parseInt(value) >= 0 || value == "")
            setPriceValue(value)
    }

    const [descriptionValue, setDescriptionValue] = useState('')
    const handleSetDescriptionValue = (value: string) => {
        setDescriptionValue(value)
    }

    const editableProductId = useParams().id
    useEffect(() => {
        if (editableProductId !== undefined && editableProductId.length > 0 && props.product.id == undefined) {
            const id: number = parseInt(editableProductId)
            props.getEditableProduct(id)
        }

        if (props.product.id !== undefined) {
            setTitleValue(props.product.header)
            setPriceValue(props.product.price.toString())
            setDescriptionValue(props.product.description)

            setCurrentSubcategoryIdSelected(props.product.subcategory.id.toString())
            setCurrentSubcategorySelected(props.product.subcategory)
        }
    }, [props.product])

    const [currentSubcategoryIdSelected, setCurrentSubcategoryIdSelected] = useState<string>('Не выбрано')
    const [currentSubcategorySelected, setCurrentSubcategorySelected] = useState<SubcategoryType>()

    const handleOnChangeOptionSubcategory = (value: string) => {
        setCurrentSubcategoryIdSelected(value)
        handleSelectCurrentSubcategory(parseInt(value))
    }

    const handleSelectCurrentSubcategory = (id: number) => {
        props.subcategories.map((subcategory) => {
            if (subcategory.id == id) {
                setCurrentSubcategorySelected(subcategory)
            }
        })
    }

    const [imageData, setImageData] = useState<FormData>()
    const handleChooseImage = (target: EventTarget & HTMLInputElement) => {
        if (target.files == null) return

        let files: FileList = target.files

        const imageData = new FormData()

        for (let i = 0; i < files.length; i++) {
            const imageNumber = i.toString()
            const currentFile = files[i]
            imageData.append('img', currentFile, imageNumber)
        }

        setImageData(imageData)
    }

    const handleUpdateProduct = async () => {
        const productRequestBody: ProductRequestBodyType = {
            header: titleValue,
            description: descriptionValue,
            price: priceValue,
            subcategory: {id: currentSubcategoryIdSelected}
        }

        props.updateProductById(props.product.id, productRequestBody)

        if (imageData == undefined || imageData.entries().next().value[1] === null) return
        props.updateProductImageById(props.product.id, imageData)
    }

    return (
        <>
            {props.subcategories.length > 0 &&
                <div className={s.content}>
                    <div className={s.container}>

                        <Input
                            type="text"
                            placeholder="Новый чай"
                            title="Название товара"
                            required={true}
                            value={titleValue}
                            multiple={false}
                            onChangeHandle={handleSetTitleValue}
                        />

                        <Input
                            type="text"
                            placeholder="1000"
                            title="Цена товара (руб)"
                            required={true}
                            value={priceValue}
                            multiple={false}
                            onChangeHandle={handleSetPriceValue}
                        />

                        <Input
                            type="text"
                            placeholder="Описание товара"
                            title="Описание товара"
                            required={true}
                            value={descriptionValue}
                            multiple={true}
                            onChangeHandle={handleSetDescriptionValue}
                        />

                        <form className={s.chooser}>
                            <label className={s.chooser__label} htmlFor="subcategory">Категория: </label>
                            <select className={s.chooser__select} value={currentSubcategoryIdSelected}
                                    onChange={(event) => {
                                        handleOnChangeOptionSubcategory(event.currentTarget.value)
                                    }} name="subcategory" id="subcategory">
                                <option disabled hidden>Не выбрано</option>
                                {subcategoryOptions.map((option, index) => {
                                    return (
                                        <option key={index * 5} value={option.value}>
                                            {option.option}
                                        </option>)
                                })}
                            </select>
                        </form>

                        <input
                            multiple
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(event) => {
                                handleChooseImage(event.currentTarget)
                            }}
                        />

                        <div onClick={handleUpdateProduct} className={s.btn__create}>Обновить товар</div>
                    </div>
                </div>
            }

            {props.subcategories.length == 0 &&
                <div className={s.content}>
                    <div className={s.container}>
                        Не удалось прогрузить данные для создания товара
                    </div>
                </div>
            }
        </>
    )
}

export default AdminEditProduct