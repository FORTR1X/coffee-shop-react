import { connect } from "react-redux";
import { OrderType, ProductType } from "../../interfaces/interfaces";
import { confirmCheckoutOrder, validateReCAPTCHAToken } from "../../store/Actions/CheckoutAction";
import { getCartProductList } from "../../store/Actions/NavbarAction";
import { CheckoutActionTypes, setAddress, setEmail, setFirstName, setLastName, setOrderNote, setPhoneNumber, setSuccessOrder, setSuccessValidationToken } from "../../store/Reducers/CheckoutReducer";
import { RootState } from "../../store/redux-store";
import Checkout from "./Checkout";

type MapStatePropsType = {
  cartProductList: Array<ProductType> | null

  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  address: string
  orderNote: string
  successValidationToken: boolean
  successOrder: boolean
}

type MapDispatchPropsType = {
  getCartProductList: (productsId: Array<number>) => void
  confirmCheckoutOrder: (order: OrderType) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setPhoneNumber: (phoneNumber: string) => void
  setEmail: (email: string) => void
  setAddress: (address: string) => void
  setOrderNote: (orderNote: string) => void
  validateReCAPTCHAToken: (token: string) => void
  setSuccessValidationToken: (state: boolean) => void
  setSuccessOrder: (successOrder: boolean) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    cartProductList: state.navbar.cartProductList,

    firstName: state.checkout.firstName,
    lastName: state.checkout.lastName,
    phoneNumber: state.checkout.phoneNumber,
    email: state.checkout.email,
    address: state.checkout.address,
    orderNote: state.checkout.orderNote,
    successValidationToken: state.checkout.successValidationToken,
    successOrder: state.checkout.successOrder
  }
}

const CheckoutContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, {getCartProductList, confirmCheckoutOrder, setFirstName, setLastName,
    setPhoneNumber, setEmail, setAddress, setOrderNote, validateReCAPTCHAToken, setSuccessValidationToken,
    setSuccessOrder}
)(Checkout)

export default CheckoutContainer
export type PropsCheckout = MapStatePropsType & MapDispatchPropsType & OwnPropsType