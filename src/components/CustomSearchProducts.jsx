import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

export const CustomSearchProducts = ({itemData}) => {
    const { navigate } =  useNavigation();
    //const photo = `../../assets/photo/products/${itemData.photo}`;
    const [favorite, setFavorite] = useState(0);
    const pages='search'
    return (
        <Pressable
            style={{
                marginHorizontal:10,
                marginVertical:10,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 15
            }}
            onPress={() => navigate('ProductsScreen', {
                itemData,
                pages
            })} 
        >
            <View style={{
                height: 215,
                width: 160,
                padding: 10
            }}>
                <View>
                    { itemData.imagen ? (
                        <Image                          
                            source={{  uri: itemData?.imagen }}                           
                            style={{
                                width:'100%',
                                height: 130,
                                marginTop:5,
                                marginBottom:5,
                                borderRadius: 15,
                                resizeMode: 'contain',
                            }}
                        />

                    ):(
                        <Image                            
                            source={require('../../assets/iconos/SinImg.png')}
                            style={{
                                width:'100%',
                                height: 130,
                                marginBottom:5,
                                borderRadius: 15,
                                resizeMode: 'contain',
                            }}
                        />
                    ) }
                </View>
                <View style={{
                    paddingHorizontal:3,
                    marginTop: 3,
                    
                }}>            
                    <Text style={{ fontSize: 10, color: 'rgba(255,255,255, 0.5)',alignSelf:"center"  }}>{ itemData.marca}</Text>
                    <Text style={{ fontSize: 10, color: '#fff',alignSelf:"center" }}>{ itemData.articulo }</Text>            
                    <Text style={{ fontSize: 12, color: '#f2058b',alignSelf:"center" }}>${ itemData.precioventa1 }.00</Text>

                </View>
                
            </View>    
        </Pressable>
    )
}
