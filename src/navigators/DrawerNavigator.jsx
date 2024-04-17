import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { LoginScreen } from '../screens/auths/LoginScreen';
import { TabsNavigator } from './TabsNavigator';
import {AuthContext } from '../context/AuthContext'
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { CustomLoading } from '../components/CustomLoading';
import { CartContext } from '../context/CartContext';
import { OrdersContext } from '../context/OrdersContext';
import { RegisterScreen } from '../screens/auths/RegisterScreen';

const Drawer= createDrawerNavigator();

export const DrawerNavigator = () => {


    const { userState, checkToken } = useContext(AuthContext);  
    
    const { state, checkToken } = useContext(AuthContext);   
    const {  getCart } = useContext(CartContext);
    const { stateOrders, getOrderState } = useContext(OrdersContext);
//    console.log(state);


    useEffect( () => {
        //checkToken();
        //getCart();        
        getOrderState();
        console.log(state);
    },[state]) 

     if(userState.isLoading){
        return (<CustomLoading/>)
    } 

    if(userState.isLogged){
        return (
            <>            
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} user={state.user}  orders= {stateOrders.state}  />}>
                <Drawer.Screen 
                    name='Home' 
                    options={{title: 'eStoreApp'}}
                    component={TabsNavigator}
                />
            </Drawer.Navigator>
            </>
        )
    }   

    if(!userState.isLogged){
        return (
            <Drawer.Navigator>
                <Drawer.Screen name='Login' options={{title: 'Login', headerShown:false,}}  component={LoginScreen}/>
                <Drawer.Screen name='Register' options={{title: 'Registrar', headerShown:false,}}  component={RegisterScreen}/>
            </Drawer.Navigator>
        )
    }  


}
