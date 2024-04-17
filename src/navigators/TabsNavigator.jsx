import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect } from 'react'
import { StackNavigator } from './StackNavigator';
import {AntDesign} from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartContext } from '../context/CartContext';
import { CartScreen } from '../screens/carts/CartScreen';
import { SearchProductScreen } from '../screens/products/SearchProductScreen';


const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
    const { stateCart, getCart } = useContext(CartContext);
    useEffect( () => {
        getCart();                
    },[]) 

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#705DAD',
                    borderColor: '#000',
                    borderWidth: 0,
                    borderRadius:50,
                    position: 'absolute',
                    bottom: 10,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    height: 50,
                },
                tabBarLabelStyle:  {
                    fontSize: 15,
                    color: '#fff',
                    fontSize: 0
                },
                tabBarActiveTintColor: '#f2058b',
                tabBarLabelStyle: { textAlign: 'center' },
                tabBarShowLabel: false,
                tabBarIndicatorStyle: {
                borderBottomColor: '#C2D5A8',
                borderBottomWidth: 2,
            }

        }}
        >            
            <Tab.Screen
                name='StackNavigator'
                component={StackNavigator}
                options={{ 
                    title:'Productos',
                    tabBarIcon: ({focused}) => (
                        <AntDesign 
                            name="home" 
                            color={focused ? 'rgba(255,255,255,1)':'rgba(255,255,255,0.6)'} 
                            size={28}
                        />
                    )
                }} 
            />

        <Tab.Screen 
            name='SearchScreen' 
            component={SearchProductScreen}
            options={{ 
                title:'Buscar',
                tabBarIcon: ({focused}) => (
                    <MaterialCommunityIcons 
                        name="note-search" 
                        color={focused ? 'rgba(255,255,255,1)':'rgba(255,255,255,0.6)'}  
                        size={28}
                    />
                )
            }} 
        />

        <Tab.Screen 
            name='Cartscreen'  
            component={CartScreen}
            options={{ 
                title:'Mi Carrito',
                tabBarIcon: ({focused}) => (
                    <AntDesign 
                        name="shoppingcart" 
                        color={focused ? 'rgba(255,255,255,1)':'rgba(255,255,255,0.6)'}  
                        size={28}
                    />
                ),
                tabBarBadge: stateCart.cart.length ? stateCart.cart.length:  null,
                tabBarBadgeStyle: {
                    backgroundColor: '#fff',
                    fontWeight: 'bold'
                }
            }} 
        />

        </Tab.Navigator>
    )
}
