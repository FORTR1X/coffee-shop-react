const SET_FIRST_NAME = 'SET_FIRST_NAME'
const SET_LAST_NAME = 'SET_LAST_NAME'
const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER'
const SET_EMAIL = 'SET_EMAIL'
const SET_ADDRESS = 'SET_ADDRESS'
const SET_ORDER_NOTE = 'SET_ORDER_NOTE'
const SET_SUCCESS_VALIDATION_TOKEN = 'SET_SUCCESS_VALIDATION_TOKEN'
const SET_SUCCESS_ORDER = 'SET_SUCCESS_ORDER'

let initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  address: '',
  orderNote: '',
  successValidationToken: false,
  successOrder: false
}

export type CheckoutInitialStateType = typeof initialState

const checkoutReducer = (state = initialState, action: CheckoutActionTypes): CheckoutInitialStateType => {
  switch (action.type) {

    case SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.firstName
      }

    case SET_LAST_NAME:
      return {
        ...state,
        lastName: action.lastName
      }

    case SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      }

    case SET_EMAIL:
      return {
        ...state,
        email: action.email
      }

    case SET_ADDRESS:
      return {
        ...state,
        address: action.address
      }

    case SET_ORDER_NOTE:
      return {
        ...state,
        orderNote: action.orderNote
      }

    case SET_SUCCESS_VALIDATION_TOKEN:
      return {
        ...state,
        successValidationToken: action.successValidationToken
      }

    case SET_SUCCESS_ORDER:
      return {
        ...state,
        successOrder: action.successOrder
      }  

    default:
      return state
  }
}

export type CheckoutActionTypes = SetFirstNameType | SetLastNameType | SetPhoneNumberType | SetEmailType |
                                  SetAddressType | SetOrderNoteType | SetSuccessValidationTokenType | SetSuccessOrderType

type SetFirstNameType = {
  type: typeof SET_FIRST_NAME
  firstName: string
}
export const setFirstName = (firstName: string): SetFirstNameType => ({
  type: SET_FIRST_NAME,
  firstName
})

type SetLastNameType = {
  type: typeof SET_LAST_NAME
  lastName: string
}
export const setLastName = (lastName: string): SetLastNameType => ({
  type: SET_LAST_NAME,
  lastName
})

type SetPhoneNumberType = {
  type: typeof SET_PHONE_NUMBER
  phoneNumber: string
}
export const setPhoneNumber = (phoneNumber: string): SetPhoneNumberType => ({
  type: SET_PHONE_NUMBER,
  phoneNumber
})

type SetEmailType = {
  type: typeof SET_EMAIL
  email: string
}
export const setEmail = (email: string): SetEmailType => ({
  type: SET_EMAIL,
  email
})

type SetAddressType = {
  type: typeof SET_ADDRESS
  address: string
}
export const setAddress = (address: string): SetAddressType => ({
  type: SET_ADDRESS,
  address
})

type SetOrderNoteType = {
  type: typeof SET_ORDER_NOTE
  orderNote: string
}
export const setOrderNote = (orderNote: string): SetOrderNoteType => ({
  type: SET_ORDER_NOTE,
  orderNote
})

type SetSuccessValidationTokenType = {
  type: typeof SET_SUCCESS_VALIDATION_TOKEN
  successValidationToken: boolean
}
export const setSuccessValidationToken = (successValidationToken: boolean): SetSuccessValidationTokenType => ({
  type: SET_SUCCESS_VALIDATION_TOKEN,
  successValidationToken
})

type SetSuccessOrderType = {
  type: typeof SET_SUCCESS_ORDER,
  successOrder: boolean
}
export const setSuccessOrder = (successOrder: boolean): SetSuccessOrderType => ({
  type: SET_SUCCESS_ORDER,
  successOrder
})

export default checkoutReducer