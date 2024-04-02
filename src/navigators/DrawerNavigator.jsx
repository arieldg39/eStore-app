import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { LoginScreen } from '../screens/auths/LoginScreen';
import { TabsNavigator } from './TabsNavigator';
import {AuthContext } from '../context/AuthContext'
import { CustomDrawerContent } from '../components/CustomDrawerContent';

const Drawer= createDrawerNavigator();

export const DrawerNavigator = () => {

    const { state, checkToken } = useContext(AuthContext);   
    console.log(state.user);

    if(!state.isLogged){
        return (
            <Drawer.Navigator
                
            >
                <Drawer.Screen name='Login' options={{title: 'Login', headerShown:false,}}  component={LoginScreen}/>
            </Drawer.Navigator>
        )
    }
    if(state.isLogged){
        return (
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} user={state.user} />}
            >
                <Drawer.Screen 
                    name='Home' 
                    options={{title: 'StoreApp'}}
                    component={TabsNavigator}
                />
            </Drawer.Navigator>
        )
    }


}
