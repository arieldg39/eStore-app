import React, { useContext, useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'

import { globalStyles } from '../themes/globalTheme'
import { ProductContext } from '../context/ProductContext';
import { CustomCardProducts } from '../components/CustomCardProducts ';


export const HomeScreen = () => {

    const { getProducts, state } = useContext(ProductContext);
    
    
    useEffect( () =>  {
        getProducts();     
        
    }, []);   

    return (
        <View style={globalStyles.container}>
            <View style={{ flex:1, alignSelf:'center'}}>
                <FlatList  
                    data={state.products}
                    renderItem={({item}) => <CustomCardProducts itemData={item}/>}
                    keyExtractor={item => item.idarticulo}  
                    horizontal={false}                    
                    numColumns={2}
                />
            </View>            
        </View>
    )
}
