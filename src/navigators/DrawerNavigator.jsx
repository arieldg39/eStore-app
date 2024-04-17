import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext, useEffect } from 'react'
import { LoginScreen } from '../screens/auths/LoginScreen';
import { TabsNavigator } from './TabsNavigator';
import {AuthContext } from '../context/AuthContext'
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { CustomLoading } from '../components/CustomLoading';
import { CartContext } from '../context/CartContext';

const Drawer= createDrawerNavigator();

export const DrawerNavigator = () => {

    const { userState, checkToken } = useContext(AuthContext);   
    const { state1, getCart } = useContext(CartContext);
   console.log(userState);

    useEffect( () => {
        checkToken();
        getCart();
    },[]) 

     if(userState.isLoading){
        return (<CustomLoading/>)
    } 

    if(userState.isLogged){
        return (
            <>            
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} user={userState.user} />}
            >
                <Drawer.Screen 
                    name='Home' 
                    options={{title: 'StoreApp'}}
                    component={TabsNavigator}
                />
            </Drawer.Navigator>
            </>
        )
    }   

    if(!userState.isLogged){
        return (
            <Drawer.Navigator
                
            >
                <Drawer.Screen name='Login' options={{title: 'Login', headerShown:false,}}  component={LoginScreen}/>
            </Drawer.Navigator>
        )
    }  


}
