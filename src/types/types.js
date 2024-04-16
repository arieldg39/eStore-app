export const types = {
    auth: {
        login:  'LOGIN',
        logout: 'LOGOUT',
        register: 'REGISTER',
        error:  'ERROR'
    },

    products: {
        getProducts:  'PRODUCTS',
        getProduct:   'PRODUCT BY ID',
        error:        'ERROR PRODUCT'
    },

    cart: {
        addCart: 'ADDCART',
        removeCart: 'REMOVECART',
        msgCart: 'MSGCART',
        finCart: 'FINCART'
    },
    orders: {
        getOrders:  'ORDERS',
        getOrder:   'ORDER BY ID',
        getOrderState:   'ORDERS STATE',
        error:      'ERROR ORDERS'
    },

}