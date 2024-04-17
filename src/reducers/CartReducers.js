// Cartreducer.js
import { types } from "../types/types";
const initialState = {
  isLoading: true,
  cart: [],
  msg: "",
  deletedItem: false
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.cart.addCart:
      return {
        ...state,
        isLoading: false,
        cart: action.payload.cart,
        cantProd: action.payload.cantProd,
      };

    case types.cart.removeCart:
      return {
        ...state,
        isLoading: false,
        cart: [],
      };

    case types.cart.msgCart:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
      };


    case types.cart.deleteItem:
      return {
        ...state,
        isLoading: false,
        cart: action.payload.cart,
        deletedItem: true
      };

        case types.cart.removeCart:
            return {
                ...state,
                isLoading:  false,
                cart: []
            }
        
        case types.cart.msgCart:
            return {
                ...state,
                isLoading: false,
                msg: action.payload.msg
            }
        case types.cart.finCart:
            return {
                ...state,
                isLoading: false,
                cart: action.payload.cart,
                msg: action.payload.msg 
            }
    
    case types.cart.updateCart:
      return {
        ...state,
        isLoading: false,
        cart: action.payload.cart,
        cantProd: action.payload.cantProd,
      };

    default:
      return state;
  }
};