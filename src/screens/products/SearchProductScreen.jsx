import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { globalStyles } from '../../themes/globalTheme'
import { CustomTextSearch } from '../../components/CustomTextSearch'
import { ProductContext } from '../../context/ProductContext'
import { CustomCardProducts } from '../../components/CustomCardProducts '
import { useForm } from '../../hooks/useForm'

export const SearchProductScreen = () => {
    const { getProductsAll,searchProducts, state } = useContext(ProductContext);
    const [productList, setProductList] = useState();
    const {formState, onInputChange}= useForm();
    //let arrData=[];
    
    useEffect( () =>  {
        getProductsAll(); 
        //arrData = state.products;
        const arrDataVer = state.products.filter((data) => data.idarticulo <=10);
        setProductList(arrDataVer);
        
    }, []);   
     useEffect( () =>  {        
        //arrData = state.products;
        //const arrDataVer = state.products.filter((data) => data.idarticulo <=10);
        setProductList(state.products);
        
    }, [state.products]);    
    /*--------------------------------------------------------------------------------------*/    
    const generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    /*--------------------------------------------------------------------------------------*/
    const renderActivity = () => {
        return (
            <View style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <ActivityIndicator  size={24}  color={'#fff'} />
            </View>
        )
    }
    /*--------------------------------------------------------------------------------------*/
    const loadMore = () => {
        let newArrData = [];        
        newArrData = state.products.filter((data) => data.idarticulo <= productList.length+10);
        console.log(newArrData);
        if(productList.length <= 150){
            setProductList([...productList, ...newArrData]);
        }
    }
    /*--------------------------------------------------------------------------------------*/
    const handleBuscar = (input) => {
        //console.log("sii"+input);
        searchProducts(input);
        console.log(state.products);
    };

    return (
        <View style={globalStyles.container}>
            <CustomTextSearch onChangeTxt={(input)=>{handleBuscar(input)}}/>     
            <FlatList  
                data={productList}
                renderItem={({item}) => <CustomCardProducts itemData={item}/>}
                keyExtractor={item => item?.idarticulo+generateId()}  
                horizontal={false}                    
                numColumns={2}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderActivity}
            />
        </View>
    )
}
