import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { LoginScreen } from '../screens/auths/LoginScreen';
import { TabsNavigator } from './TabsNavigator';

const Drawer= createDrawerNavigator();

export const DrawerNavigator = () => {
    const isLogged = true;


    if(!isLogged){
        return (
            <Drawer.Navigator>
                <Drawer.Screen name='Login' options={{title: 'Login', headerShown:false}} component={LoginScreen}/>
            </Drawer.Navigator>
        )
    }
    if(isLogged){
        return (
            <Drawer.Navigator>
                <Drawer.Screen name='Home' options={{title: 'StoreApp.com'}} component={TabsNavigator}/>
            </Drawer.Navigator>
        )
    }


}
