import React, { useContext, useEffect, useState } from 'react'
import { useQuantity } from '../../hooks/useQuantity';
import { CartContext } from '../../context/CartContext';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomQuantity } from '../../components/CustomQuantity';
import { globalStyles } from '../../themes/globalTheme';
import {AntDesign} from 'react-native-vector-icons';
import { CustomLoadingPage } from '../../components/CustomLoadingPage';
 import { CustomAlert } from '../../components/CustomAlert';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext'; 

export const CartScreen = ({navigation}) => {
    const { stateCart,finalCart } = useContext(CartContext);
    const { state } = useContext(AuthContext);  
    //const { quantity, sumQuantity, restQuantity} = useQuantity();
    const [cantidad, setCantidad] = useState(0);
    const [modalShow, setModalShow] = useState(false); 
    const { navigate } =  useNavigation();

    let total=0;

    useEffect (() => {      
        if(stateCart.msg==="ok")
        {
            navigate("Home");
        }
    }, [stateCart])
    

    const generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    /*--------------------------------------------------------------------------------------*/
    const hideMessage = () =>{
        setModalShow(false)
    };
    const handleSubmit = () => {
        setModalShow(true);
        console.log(state, stateCart);
        finalCart(state.user.idusuario, stateCart.cart, total );
        //navigate('Home');
    };
    /*--------------------------------------------------------------------------------------*/
    const MessageModal = ({ visible, message, gifSource, onClose }) => {
        return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Image source={gifSource} style={styles.gifImage} />
                <Text style={styles.messageText}>{message}</Text>
                {/* <Button title="Cerrar" onPress={onClose} /> */}
            </View>
            </View>
        </Modal>
        );
    };
    /*--------------------------------------------------------------------------------------*/
    const sumar = (t)=>{
        //console.log("precio:"+t);
        total =total + parseFloat(t);        
        setCantidad(total);
    }
    /*------------------------------Carga el Flatlist con los articulos del carrit--------------- */
    const cartRender = (item) => { 
        sumar(item.subTotal);
        return (            
            <View style={{
                backgroundColor: '#ccc',
                flexDirection:  'row',
                borderWidth: 3,
                justifyContent: 'center',
                alignItems:  'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderTopEndRadius: 10,
                borderBottomEndRadius: 10,
                padding:10,
                height:150
            }}>
                <View style={{
                    flex: 1,
                    marginRight: 10
                }}>
                { 
                    item.img ? (
                        <Image                          
                            source={{  uri: item?.img }}                
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
                        flex:3, 
                        alignItems: 'flex-start',                        
                    }}>
                    <View>                        
                        <Text style={{ fontSize: 16, color: '#fff' }}>{ item.product}</Text>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Cantidad: { item.qty}</Text>
                        <Text style={{ fontSize: 18, color: '#f2058b', fontWeight: 'bold'}}>Subtotal: ${item.subTotal}</Text>
                        
                    </View>
                </View>
                <View style={{ flex:2, alignItems: 'center'}}>                  
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button}>
                            <AntDesign name="edit" size={25} color="white" />
                            {/* <Text style={styles.buttonText}>Modificar</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}>
                            <AntDesign name="delete" size={25} color="white" />
                            {/* <Text style={styles.buttonText}>Eliminar</Text> */}
                        </TouchableOpacity>
                    </View>                    
                </View>

            </View>
        )
        
    }   

    /*----------------------------------------------------------------------------------------------- */
    if(stateCart.cart.length>0) {
        return (
            <View style={ globalStyles.container }>
                <View style={styles.containerPrimary}>                
                    <FlatList 
                        data={stateCart.cart}
                        renderItem={ ({item}) => cartRender(item) }
                        keyExtractor={item => item.id+generateId()}
                    />            
                    <View style={styles.containerTotal}>
                        <Text style={styles.textTotal}>  Total de Venta ${cantidad}</Text>                        
                        <TouchableOpacity
                            style={globalStyles.defaultBtn}  
                            onPress={handleSubmit}
                        >
                            <Text Text style={globalStyles.defaulTextBtn}>Finalizar Compra</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
                <MessageModal
                    visible={modalShow}
                    message="Finalizando Compra..."
                    gifSource={require('../../../assets/carro2.gif')}
                    onClose={hideMessage}
                />          
                {/* <CustomAlert 
                    visible={modalShow}
                    title={"eStore.com"}
                    message="Finalizando Compra..."
                    onClose={hideMessage}
                /> */}
            </View>
        )
    }else{
        return (
            <View style={ globalStyles.container }>
                <View style={styles.containerPrimary}>                
                    <View style={styles.containerMensaje}>
                        <Text style={styles.textMensaje}>Carrito Sin Articulos!!!</Text>
                    </View>
                    <View style={styles.containerTotal}>
                        <Text style={styles.textTotal}>  Total de Venta $0</Text>
                        <TouchableOpacity
                            style={globalStyles.defaultBtn}  
                            onPress={handleSubmit}
                            disabled
                        >
                            <Text Text style={globalStyles.defaulTextBtn}>Finalizar Compra</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
};

const styles = StyleSheet.create({
    containerPrimary:{
        flex:2,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    containerTotal:{
        position: 'relative',
        //backgroundColor: 'rgba(45, 50, 63, 0.8)',
        backgroundColor: 'rgba(225, 216, 255, 1)',
        height:100,       
        borderTopEndRadius:20, 
        borderTopLeftRadius:20,        
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom:10,        
    },
    buttonText: {
        color: 'white',        
    },
    textTotal: {
        color: 'rgba(42, 7, 66, 1)',
        fontSize:20,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginHorizontal: 60,
        marginBottom:-10
    },
    containerMensaje: {
        height:"75%",
        alignContent:"center",
        justifyContent:"center",
    },
    textMensaje: {
        color: 'white',
        fontSize:30,            
        alignSelf: 'center',    
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',        
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width:300
    },
    messageText: {
        marginBottom: 20,
        fontSize: 20,
    },
    gifImage: {
        width: 200,
        height: 200,
    },
});
