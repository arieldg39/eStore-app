import React, { useContext, useState } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../themes/globalTheme";
import { MaterialIcons } from "react-native-vector-icons";
import { CustomQuantity } from "../../components/CustomQuantity"; 
import  {useQuantity}  from "../../hooks/useQuantity";
import { CartContext } from "../../context/CartContext";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ProductsScreen = ({ route }) => {

    const { itemData } = route.params;
    //const [talle, setTalle] = useState(0);
    const { quantity, restQuantity, sumQuantity } = useQuantity();
    const { addCart, state } = useContext(CartContext);
    const { navigate } =  useNavigation();

    //console.log(itemData);


   /*  const obtenerTalle = (dataTalle) => {
        if (dataTalle == talle) {
        return setTalle(0);
        }
        setTalle(dataTalle);
    }; */

    const addToCart = () => {
         const data = {
            product: itemData,            
            qty: quantity
        }

        addCart(data); 
        navigate('Home');
        console.log(state);
    }


    return (
        <View style={globalStyles.container}>
            <View
                style={{
                flex: 5,
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                { 
                    itemData.imagen ? (
                            <Image                          
                                source={{  uri: itemData?.imagen }}                
                                style={{
                                    width:'100%',
                                    height: 190,
                                    marginBottom:5,
                                    borderRadius: 10,
                                    resizeMode: 'contain',
                                }}
                            />
                        ):( 
                            <Image                            
                                source={require('../../../assets/iconos/SinImg.png')}
                                style={{
                                    width:'100%',
                                    height: 190,
                                    marginBottom:5,
                                    borderRadius: 10,
                                    resizeMode: 'contain',
                                }}
                            />
                        ) 
                }
            </View>

            <View
                style={{
                flex: 2,
                marginVertical: 20,
                justifyContent: "center",
                alignItems: 'center'
                }}
            >
                <Text style={{ fontSize: 16, color: "rgba(255,255,255, 0.5)" }}>
                    {/* {itemData.categories.category} */}
                    {itemData.marca}
                </Text>
                <Text style={{ fontSize: 19, color: "#fff", fontWeight: "bold" }}>
                    {/* {itemData.name}{" "} */}
                    {itemData.articulo}{" "}
                </Text>
                <Text style={{ fontSize: 26, color: "#f2058b", fontWeight: "bold" }}>
                    {/* ${itemData.price} */}
                    ${itemData.precioventa1}
                </Text>
            </View>

            <View
                    style={{
                    marginVertical: 20,
                    alignItems: "center",
                    }}
                >
                    <View style={{
                flexDirection: "row",
                // borderWidth: 1.2,
                borderColor: "#fff",
                borderRadius: 5
                }}
            >
                <Pressable 
                    style={{ alignItems: "center" }}
                    onPress={ restQuantity }
                >
                    <AntDesign name="minussquare" size={25} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>
        
                <View
                style={{
                    alignItems: "center",
                    minWidth: 50
                }}
                >
                    <Text
                        style={{
                        color: "#fff",
                        fontSize: 19,
                        fontWeight: "bold",
                        // marginHorizontal: 12,
                        }}
                    >
                        {quantity}
                    </Text>
                </View>
        
                <Pressable
                    style={{alignItems: "center"}}
                    onPress={ sumQuantity }
                >
                    <AntDesign name="plussquare" size={25} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>
            </View>
            <View>
                    <Text
                        style={{
                        fontSize: 15,
                        color: "rgba(255,255,255, 0.5)",
                        marginBottom: 5,
                        }}
                    >
                        Cantidad
                    </Text>
                </View>     
            </View>

            <View
                style={{
                flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        marginTop: 10,
                        marginBottom: 30,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f2058b",
                            alignItems: "center",
                            fontSize: "17",
                            fontWeight: "600",
                            color: "#fff",
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            borderRadius: 5,
                            alignSelf:  'center'
                        }}
                        onPress={addToCart}
                    >
                        <Text style={globalStyles.defaulTextBtn}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
            </View>

          {/*   <View
                style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "rgba(255,255,255,0.5)",
                    }}
                    >
                    4.8
                </Text>
                <MaterialIcons name="star" color="yellow" size={30} />
            </View> */}
        </View>
    );
};
