import { types } from '../types/types'

export const OrdersReducer = (state={}, action) =>{ 
    switch(action.type){
        case types.orders.getOrders:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
                orders: action.payload.orders
            }

        case types.orders.getOrder:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
                order: action.payload.order
            }
        case types.orders.getOrderState:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
                state: action.payload.state
            }
    
        case types.orders.error:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.errorMessage,
                orders: null
            }

        default: {
            return state
        }
    }
};