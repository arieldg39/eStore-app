import React, { useReducer, useState } from 'react'
import { CartReducer } from '../reducers/CartReducers';
import { CartContext } from '../context/CartContext';
import { types } from '../types/types';
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
    isLoading: true,
    cart: [],
    msg: ''
}

export const CartProvider = ({ children }) => {
    const [  state, disptach ] = useReducer(CartReducer,  initialState);
    const [cartData, setCartData] = useState([]);

    const addCart = async(productData)=>{ 
        
        let subtotal = productData.product.precioventa1*productData.qty;        

        const addProduct = [
            ...state.cart,
            {
                id: productData.product.idarticulo,
                product: productData.product.articulo,
                price: productData.product.precioventa1,               
                qty: productData.qty,
                subTotal: subtotal,
                marca: productData.product.marca,
                img: productData.product.imagen
            }
        ];
        //const cartJson =  await AsyncStorage.getItem('cartStorage');
        /* f(cartJson !== null){
            await AsyncStorage.clear('cartStorage');
        } */
        await AsyncStorage.setItem('cartStorage', JSON.stringify({                         
            products: addProduct             
        }));

        disptach({
            type: types.cart.addCart,
            payload: {
                cart: addProduct,
                cantProd: addProduct.length
            }
        })

    };

    const getCart = async() =>{ 
        try {
            const cartJson =  await AsyncStorage.getItem('cartStorage');                        
            const cartArray = JSON.parse(cartJson);  
            console.log("first cart array: " + cartArray);
            setCartData(cartArray);            
            let addProduct=[];
            for (let i = 0; i < cartData.products.length; i++) {
                const item = cartData.products[i];
                addProduct = [
                    ...addProduct,
                    {
                        id: item.id,
                        product: item.product,
                        price: item.price,               
                        qty: item.qty,
                        subTotal: item.subTotal,
                        marca: item.marca,
                        img: item.img
                    }
                ];            
            }           
            disptach({
                type: types.cart.addCart,
                payload: {
                    cart: addProduct,
                    cantProd: addProduct.length
                }
            })
        } catch (error) {
            
        }
    };
    
    return (
        <CartContext.Provider
            value={{
                state,
                addCart,
                getCart
            }}
        >
            { children }
        </CartContext.Provider>
    )
}
