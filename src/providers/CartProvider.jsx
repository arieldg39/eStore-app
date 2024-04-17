import React, { useReducer, useState } from "react";
import { CartReducer } from "../reducers/CartReducers";
import { CartContext } from "../context/CartContext";
import { types } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { eStoreApi } from '../config/eStoreAxios';

const initialState = {
  isLoading: true,
  cart: [],
  msg: "",
};

export const CartProvider = ({ children }) => {
    const [  stateCart, disptach ] = useReducer(CartReducer,  initialState);
    const [cartData, setCartData] = useState([]);

  const addCart = async (productData) => {
    let subtotal = productData.product.precioventa1 * productData.qty;

    const addProduct = [
      ...stateCart.cart,
      {
        id: productData.product.idarticulo,
        product: productData.product.articulo,
        price: productData.product.precioventa1,
        qty: productData.qty,
        subTotal: subtotal,
        marca: productData.product.marca,
        img: productData.product.imagen,
      },
    ];

    await AsyncStorage.setItem(
      "cartStorage",
      JSON.stringify({
        products: addProduct,
      })
    );

    disptach({
      type: types.cart.addCart,
      payload: {
        cart: addProduct,
        cantProd: addProduct.length,
      },
    });
  };

  const getCart = async () => {
    try {
      const cartJson = await AsyncStorage.getItem("cartStorage");
      const cartArray = JSON.parse(cartJson);
      console.log("first cart array: " + cartArray);
      setCartData(cartArray);
      console.log(cartData);
      if(cartData!=null) {

        let addProduct = [];
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
              img: item.img,
            },
          ];
        }
        console.log("carrito->"+addProduct);
        disptach({
          type: types.cart.addCart,
          payload: {
            cart: addProduct,
            cantProd: addProduct.length,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    const cartJson = await AsyncStorage.getItem("cartStorage");
    const cartArray = JSON.parse(cartJson);
    console.log("Delete this " + id);

    const updatedCart = cartArray.products.filter((item) => item.id !== id);
    setCartData({ products: updatedCart });
    setCartData(updatedCart);
    console.log(updatedCart);
    try {
      await AsyncStorage.setItem(
        "cartStorage",
        JSON.stringify({
          products: updatedCart,
        })
      );

      disptach({
        type: types.cart.deleteItem,
        payload: {
          cart: updatedCart,
          cantProd: updatedCart.length,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateCart = async (id, newQty) => {
    try {
      const cartJson = await AsyncStorage.getItem("cartStorage");
      const cartArray = JSON.parse(cartJson);
      const updatedProducts = cartArray.products.map((item) => {
        if (item.id === id) {
          let subtotal = item.price * newQty;
          return { ...item, qty: newQty, subTotal: subtotal };
        }

        return item;
      });

      await AsyncStorage.setItem(
        "cartStorage",
        JSON.stringify({ products: updatedProducts })
      );

      setCartData({ products: updatedProducts });

      disptach({
        type: types.cart.updateCart,
        payload: {
          cart: updatedProducts,
          cantProd: updatedProducts.length,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

    const endCart = async (cart,total) => {
        //console.log(idUser, cart);
        try {
            const data = await eStoreApi.post('/ventas/register',{                
                cart,
                total
            });   
            disptach({
                type: types.cart.finCart,
                payload: {
                    cart: [],
                    msg:"OK",
                }
            })
            await AsyncStorage.removeItem('cartStorage');
        } catch (error) {
            if (error.response) {
                dispatch({
                    type: "ERROR-MESSAGE",
                    payload: {
                    msg: error.response.data.tipoerror,
                    },
                });
                } else {                
                dispatch({
                    type: "ERROR-MESSAGE",
                    payload: {
                    msg: "An error occurred during the request",
                    },
                });
                }
        }
    };
    return (
        <CartContext.Provider
            value={{
                stateCart,
                addCart,
                getCart,
                endCart,
                deleteItem,
                updateCart,
            }}
        >
            { children }
        </CartContext.Provider>
    )
}

