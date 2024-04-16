import React, { useReducer } from 'react'
import { OrdersReducer } from '../reducers/OrdersReducer';
import { OrdersContext } from '../context/OrdersContext';
import { eStoreApi } from '../config/eStoreAxios';
import { types } from '../types/types';

const initialState = {
    isLoading: true,
    errorMessage: '',
    orders: null,
}


export const OrdersProvider = ({children}) => {

    const [stateOrders, dispatch] = useReducer(OrdersReducer, initialState);

    const getOrders = async() =>{
        const products = await eStoreApi.get('/orders/getOrders'); 
    };

    const getOrderState = async(idusuario) =>{
        try {
            const orders = await eStoreApi.get('/orders/getState',{idusuario});
            console.log(orders);   
            dispatch({
                type: types.orders.getOrderState,
                payload:  {
                    state:orders.data.dataState,
                }
            })         
 
        } catch (error) {
            console.log(error);
            dispatch({
                type: types.orders.error,
                payload:  {
                    errorMessage: error.response.data.msg
                }
            }) 
        }
    };

    
    return (
        <OrdersContext.Provider
            value={{
                stateOrders,
                getOrders,
                getOrderState,
            }}
        >
            { children }
        </OrdersContext.Provider>
    )
}
