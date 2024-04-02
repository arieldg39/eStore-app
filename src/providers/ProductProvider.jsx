import React, { useReducer } from 'react'
import { ProductContext } from '../context/ProductContext';
import {ProductReducer} from '../reducers/ProductReducer';
import { eStoreApi } from '../config/eStoreAxios';
import { types } from '../types/types';

const initialState = {
    isLoading: true,
    errorMessage: '',
    products: null,
}

export const ProductProvider = ({children}) => {

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const getProducts = async() => {

        try {
            
            const products = await eStoreApi.get('/products/list');           
            console.log(products);
         /*    if(!products){
                dispatch({
                    type: types.products.error,
                    payload: {
                        errorMessage: 'No existen Productos activos'
                    }
                })
            } */
            dispatch({
                type: types.products.getProducts,
                payload:  {
                    products:products.data.dataProducts,
                }
            })

            
        } catch (error) {
            console.log(error);
            dispatch({
                type: types.products.error,
                payload:  {
                    errorMessage: error.response.data.msg
                }
            }) 
        }
    }

    return (
        <ProductContext.Provider
            value={{
                state,
                getProducts
            }}
        >
            { children }            
        </ProductContext.Provider>
    )
}