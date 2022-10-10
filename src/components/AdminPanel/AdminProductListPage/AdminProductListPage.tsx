import React, { useEffect, useState } from "react"

import editSvg from './../svg/edit.svg'
import deleteSvg from './../svg/delete.svg'
import AdminTableInput from "../AdminCustomElements/AdminTableInput/AdminTableInput"
import AdminCheckbox from "../AdminCustomElements/AdminCheckbox/AdminCheckbox"

import s from './AdminProductListPage.module.css'
import { ProductType } from "../../../interfaces/interfaces"
import { useLocalStorage } from "usehooks-ts"
import { PropsAdminProductListType } from "./AdminProductListPageContainer"

const AdminProductListPage: React.FC<PropsAdminProductListType> = (props: PropsAdminProductListType) => {
  
  const localToken = localStorage.getItem('token')
  const token = localToken == null ? '' : localToken
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh-token', '')

  useEffect(() => {
    if (props.products.length == 0 && token.length > 0) {
      props.getAllProducts()
    }
  }, [token, props.products])

  const productList: Array<ProductType> = [...props.products]
  productList.sort((a, b) => {return a.id < b.id ? -1 : 1}) // by id asc

  const [selectedProductIds, setSelectedProductIds] = useState([] as Array<number>)
  const handleAddSelectedProductById = (id: number) => {
    setSelectedProductIds([...selectedProductIds, id])
  }

  const [idValue, setIdValue] = useState('')
  const handleSetIdValue = (value: string) => {
    setIdValue(value)
  }

  const [titleValue, setTitleValue] = useState('')
  const handleSetTitleValue = (value: string) => {
    setTitleValue(value)
  }

  const [priceValue, setPriceValue] = useState('')
  const handleSetPriceValue = (value: string) => {
    setPriceValue(value)
  }

  const [categoryValue, setCategoryValue] = useState('')
  const handleSetCategoryValue = (value: string) => {
    setCategoryValue(value)
  }

  const [subcatValue, setSubcatValue] = useState('')
  const handleSetSubcatValue = (value: string) => {
    setSubcatValue(value)
  }

  const handleDeleteFromSelectedProductById = (id: number) => {
    const COUNT_SELECTED_PRODUCTS_ID = selectedProductIds.length
    let splicedArray = selectedProductIds

    for (let i = 0; i < COUNT_SELECTED_PRODUCTS_ID; i++) {
      if (id == selectedProductIds[i]) {
        splicedArray.splice(i, 1)
      }
    }

    setSelectedProductIds(splicedArray)
  }

  const handleDeleteSelected = () => {
    if (selectedProductIds.length == 0)
      alert('Ошибка. Не выбран ни один товар!')
    if (selectedProductIds.length > 0) {
      props.deleteByIds(selectedProductIds)
      props.getAllProducts()
    }
  }

  const [isAllFieldsSearchEmpty, setIsAllFieldsSearchEmpty] = useState(true)
  const [findedProducts, setFindedProducts] = useState<Array<ProductType>>()

  const handleSearchInArrayByParam = (): Array<ProductType> => {
    let searchedArray: Array<ProductType> = []

    productList.map((product) => {
      if (product.id.toString().includes(idValue) && product.header.includes(titleValue) 
          && product.price.toString().includes(priceValue) && product.subcategory.category.title.includes(categoryValue)
          && product.subcategory.title.includes(subcatValue))
            searchedArray.push(product)
    })

    return searchedArray
  }

  useEffect(() => {
    const IS_ID_VALUE_EMPTY = idValue.length == 0
    const IS_TITLE_VALUE_EMPTY = titleValue.length == 0
    const IS_PRICE_VALUE_EMPTY = priceValue.length == 0
    const IS_CATEGORY_VALUE_EMPTY = categoryValue.length == 0
    const IS_SUBCAT_VALUE_EMPTY = subcatValue.length == 0

    if (IS_ID_VALUE_EMPTY && IS_TITLE_VALUE_EMPTY && IS_PRICE_VALUE_EMPTY && IS_CATEGORY_VALUE_EMPTY && IS_SUBCAT_VALUE_EMPTY) {
      setIsAllFieldsSearchEmpty(true)
    } else {
      setIsAllFieldsSearchEmpty(false)
    }

    if (!isAllFieldsSearchEmpty) {
      setFindedProducts(handleSearchInArrayByParam())
    }
  }, [isAllFieldsSearchEmpty, idValue, titleValue, priceValue, categoryValue, subcatValue])
  
  const handleDelteProductById = async (id: number) => {
    await props.deleteProductById(id)
    await props.getAllProducts()
  }

  return (
    <div className={s.content__table}>
      <div className={s.table__top_btns}>
        <div className={s.btns__group}>
          <div onClick={handleDeleteSelected} className={s.table__btn}>Удалить выделенные</div>
          <a href="/admin/product/add" className={s.table__btn}>Добавить товар</a>
        </div>

        <div className={s.table__btn}>Выгрузить таблицу</div>
      </div>
      
      <table className={s.product_list__table}>
        <tbody>
          <tr className={s.table__first_row}>
            <td>-</td>
            <td>
              <AdminTableInput title="ID" value={idValue} onChange={handleSetIdValue}/>
            </td>
            <td>
              <AdminTableInput title="Название" value={titleValue} onChange={handleSetTitleValue}/>
            </td>
            <td>
              <AdminTableInput title="Цена" value={priceValue} onChange={handleSetPriceValue}/>
            </td>
            <td>
              <AdminTableInput title="Категория" value={categoryValue} onChange={handleSetCategoryValue}/>
            </td>
            <td>
              <AdminTableInput title="Подкатегория" value={subcatValue} onChange={handleSetSubcatValue}/>
            </td>
            <td>Действия</td>
          </tr>

          {isAllFieldsSearchEmpty && productList.map((product, index) => {
            return (
              <tr className={index % 2 == 0 ? `${s.product_row} ${s.even}` : `${s.product_row} ${s.odd}`}>
                <td>
                  <AdminCheckbox
                    onClickAdd={() => {handleAddSelectedProductById(product.id)}}
                    onClickDelete={() => {handleDeleteFromSelectedProductById(product.id)}}
                    value={product.id}
                  />
                </td>
                <td> {product.id} </td>
                <td> {product.header} </td>
                <td> {product.price} </td>
                <td> {product.subcategory.category.title} </td>
                <td> {product.subcategory.title} </td>
                <td> 
                  <div className={s.product_row__btn_group}>
                    <button type="button">
                      <a href={`/admin/product/edit/id${product.id}`}>
                        <img className={s.btn__img} src={editSvg} alt="Редактировать" />
                      </a>
                    </button>
                    
                    <button onClick={() => {handleDelteProductById(product.id)}} type="button">
                      <img className={s.btn__img} src={deleteSvg} alt="Удалить" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}

          {!isAllFieldsSearchEmpty && findedProducts !== undefined && findedProducts.map((product) => {
            return (
              <tr className={s.product_row}>
                <td> 
                  <AdminCheckbox
                    onClickAdd={() => {handleAddSelectedProductById(product.id)}}
                    onClickDelete={() => {handleDeleteFromSelectedProductById(product.id)}}
                    value={product.id}
                  />
                </td>
                <td> {product.id} </td>
                <td> {product.header} </td>
                <td> {product.price} </td>
                <td> {product.subcategory.category.title} </td>
                <td> {product.subcategory.title} </td>
                <td> 
                  <div className={s.product_row__btn_group}>
                    <button type="button">
                      <a href={`/admin/product/edit/id${product.id}`}>
                        <img className={s.btn__img} src={editSvg} alt="Редактировать" />
                      </a>
                    </button>
                    
                    <button onClick={() => {handleDelteProductById(product.id)}} type="button">
                      <img className={s.btn__img} src={deleteSvg} alt="Удалить" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>  
  )
}

export default AdminProductListPage