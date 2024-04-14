import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen'
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { CartScreen } from '../screens/carts/CartScreen';

const Stack= createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff'
                },

                headerStyle: {
                    borderBottomColor: '#000',
                    borderBottomWidth: 1,
                    elevation: 5,
                    shadowColor: '#000',
                }
            }}
        >
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='ProductsScreen' component={ProductsScreen}/>
            <Stack.Screen name='CartScreen' component={CartScreen}/>
        </Stack.Navigator>
    )
}
