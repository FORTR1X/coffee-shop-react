import React, {useEffect, useState} from "react"
import {AdminStocksPropsType} from "./AdminStocksContainer"

import s from './AdminStocks.module.css'
import {BASE_URL} from "../../../hooks/useApi"

const AdminStocks: React.FC<AdminStocksPropsType> = (props: AdminStocksPropsType) => {

    useEffect(() => {
        if (props.titleImages.length == 0) {
            props.getStocks()
        }

        if (props.titleImages.length > 0 && stockInputsValue.length == 0) {
            setStockInptsValue(props.titleImages)
            handleSetInitialStateImagesData()
        }
    }, [props.titleImages])

    const defaultStockInputsValue = props.defaultTitleImages
    const [stockInputsValue, setStockInptsValue] = useState<Array<string>>([])

    const handleChangeStockInputValue = (index: number, value: string) => {
        let stockInputsValueSub: Array<string> = stockInputsValue
        stockInputsValueSub[index] = value
        setStockInptsValue([...stockInputsValueSub])
    }

    const [imagesData, setImagesData] = useState<Array<FormData>>([])
    const handleSetInitialStateImagesData = () => {
        let initialStateImagesData: Array<FormData> = []

        props.titleImages.map(() => {
            initialStateImagesData.push(new FormData())
        })

        setImagesData([...initialStateImagesData])
    }

    const handleChooseImage = (index: number, target: EventTarget & HTMLInputElement) => {
        let imagesDataSub: Array<FormData> = imagesData
        if (target.files == null) return

        let files: FileList = target.files

        const imageData = new FormData()

        for (let i = 0; i < files.length; i++) {
            const imageNumber = i.toString()
            const currentFile = files[i]
            imageData.append('img', currentFile, imageNumber)
        }

        imagesDataSub[index] = imageData
        setImagesData([...imagesDataSub])
        props.editPhotoStock(index, imagesData[index])
    }


    const handleChangeStockIdOrChangeStockPhoto = (index: number) => {
        if (defaultStockInputsValue[index] != stockInputsValue[index]) {
            props.editIdStock(defaultStockInputsValue[index], stockInputsValue[index])
        }

        // if (defaultStockInputsValue[index] != stockInputsValue[index]) {

        // }
        // Менять фото, если imageData изменилась и id тот же
        // Менять id, если id изменилось, imageData та же
    }

    return (
        <>
            <div className={s.content}>
                <div className={s.container}>

                    {props.titleImages.length == stockInputsValue.length && props.defaultTitleImages.map((image, index) => {
                        return (
                            <div key={index + 1} className={s.stock__container}>
                                <div className={s.stock__number_delete}>
                                    <p className={s.stock__number}>Акция №{index + 1}</p>
                                    <p className={s.stock__btn_delete}>Удалить <span/></p>
                                </div>

                                <div className={s.stock__inputs}>
                                    <div className={s.stock__input_id_container}>
                                        <span className={s.stock__input_title}>ID товара</span>
                                        <input
                                            value={stockInputsValue[index]}
                                            onChange={(event) => {
                                                handleChangeStockInputValue(index, event.currentTarget.value)
                                            }}
                                            className={s.stock__input_id}
                                            type="text"
                                            placeholder="ID товара"
                                        />
                                    </div>

                                    <input
                                        onChange={(event) => {
                                            handleChooseImage(index, event.currentTarget)
                                        }}
                                        className={s.stock__input_file}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                    />
                                </div>

                                <img className={s.stock__photo} src={`${BASE_URL}/uploads/bg/${image}.jpg`}
                                     alt={`${image} Not Found`}/>

                                <div onClick={() => handleChangeStockIdOrChangeStockPhoto(index)}
                                     className={s.stock__btn_save}>Сохранить
                                </div>
                            </div>
                        )
                    })}

                    <div className={s.stock__container}>
                        <div className={s.stock__number_delete}>
                            <p>Новая акция</p>

                            <div className={s.stock__input_id_container}>
                                <span className={s.stock__input_title}>ID товара</span>
                                <input className={s.stock__input_id} type="number" placeholder="ID товара"/>
                            </div>
                        </div>

                        <div className={s.stock__input_btn}>
                            <div className={s.stock__input_error}>
                                <input className={s.stock__input_file} type="file" accept="image/png, image/jpeg"/>
                                <p className={s.stock__error}>Ошибка, укажите ID товара</p>
                            </div>

                            <div className={s.stock__btn_add}>Добавить</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminStocks