import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import {
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../../themes/globalTheme";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";


export const CartScreen = ({ navigation }) => {

  const { stateCart,  deleteItem, updateCart,endCart} = useContext(CartContext);  
  
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const [item, setItem] = useState("")
  
  const { navigate } =  useNavigation();


  let total = 0;
    useEffect (() => {      
        if(stateCart.msg==="ok")
        {
            navigate("Home");
        }
    }, [stateCart]) 


  const generateId = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  /*--------------------------------------------------------------------------------------*/
  const hideMessage = () => {
    setModalShow(false);
  };
  
  const handleSubmit = () => {
      setModalShow(true);
      /* console.log(stateCart, userState);*/
      endCart( stateCart.cart, total );
  };

  const handleDeleteItem = (id) => deleteItem(id);
  /*--------------------------------------------------------------------------------------*/
  const sumarTotal = (t) => {
    /* 
    console.log("precio:" + t); */
    total = total + parseFloat(t);
    setCantidadTotal(total);
  };

  const sumarEnC = (item) => {
    const prev = item.qty;
    if (prev <= 0) return;
    item.qty = prev + 1;
    updateCart(item.id, item.qty);
  }; 
  function restarEnC(item) {
    const prev = item.qty;
    if (prev <= 0) return;
    item.qty = prev - 1;
    if (item.qty == 0) {
      handleDeleteItem(item.id);
    } else {
      updateCart(item.id, item.qty); 
    }
  }
  /*------------------------------Carga el Flatlist con los articulos del carrit--------------- */
  const cartRender = (item) => {
    sumarTotal(item.subTotal);
    /* setItem(item); */
    return (
      <View
        style={{
          backgroundColor: "#ccc",
          flexDirection: "row",
          borderWidth: 3,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderTopEndRadius: 10,
          borderBottomEndRadius: 10,
          padding: 10,
          height: 150,
        }}
      >
        <View
          style={{
            flex: 1,
            marginRight: 10,
          }}
        >
          {item.img ? (
            <Image
              source={{ uri: item?.img }}
              style={{
                width: "100%",
                height: 190,
                marginBottom: 5,
                borderRadius: 10,
                resizeMode: "contain",
              }}
            />
          ) : (
            <Image
              source={require("../../../assets/iconos/SinImg.png")}
              style={{
                width: "100%",
                height: 190,
                marginBottom: 5,
                borderRadius: 10,
                resizeMode: "contain",
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 2.5,
            alignItems: "flex-start",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, color: "#fff" }}>{item.product}</Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>
              ${item.price} - Cantidad: {item.qty}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#f2058b", fontWeight: "bold" }}
            >
              Subtotal: ${item.subTotal}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.5,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={{ alignItems: "center" }}
                onPress={() => (setItem(item), restarEnC(item))}
              >
                <AntDesign
                  name="minussquare"
                  size={25}
                  color="rgba(255, 255, 255, 0.5)"
                />
              </Pressable>

              <View
                style={{
                  alignItems: "center",
                  minWidth: 50,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 19,
                    fontWeight: "bold"
                  }}
                >
                  {item.qty}
                </Text>
              </View>

              <Pressable
                style={{ alignItems: "center" }}
                onPress={() => (setItem(item), sumarEnC(item))}
              >
                <AntDesign
                  name="plussquare"
                  size={25}
                  color="rgba(255, 255, 255, 0.5)"
                />
              </Pressable>
            </View>

            {/* Delete button */}
            <View
              style={{
                marginTop: 15,
                padding: 5,
                backgroundColor: "red",
                borderRadius: 5,
              }}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => handleDeleteItem(item.id)}
              >
                <AntDesign name="delete" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  /*-------------------------------Modal Mensajes------------------------------------------------------ */
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
                <Button title="Cerrar" onPress={onClose} />
            </View>
          </View>
      </Modal>
    );
};

  /*----------------------------------------------------------------------------------------------- */
  if (stateCart.cart.length > 0) {
    return (
      <View style={globalStyles.container}>
        <View style={styles.containerPrimary}>
          <FlatList
              data={stateCart.cart}
              renderItem={({ item }) => cartRender(item)}
              keyExtractor={ ()=>{generateId()+1}}
              onEndReachedThreshold={0.5}
          />
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}>
              {" "}
              Total de Venta ${cantidadTotal}
            </Text>
            <TouchableOpacity 
              style={globalStyles.defaultBtn}
              onPress={handleSubmit}
            >
              <Text Text style={globalStyles.defaulTextBtn}>
                Finalizar Compra
              </Text>
            </TouchableOpacity>
          </View>
        </View>
   
          <MessageModal
              visible={modalShow}
              message="Finalizando Compra..."
              gifSource={require('../../../assets/carro2.gif')}
              onClose={hideMessage}
          /> 
      </View>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <View style={styles.containerPrimary}>
          <View style={styles.containerMensaje}>
            <Text style={styles.textMensaje}>Carrito Sin Articulos!!!</Text>
          </View>
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}> Total de Venta $0</Text>
            <TouchableOpacity
              style={globalStyles.defaultBtn}
              onPress={handleSubmit}
            >
              <Text Text style={globalStyles.defaulTextBtn}>
                Finalizar Compra
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  containerPrimary: {
    flex: 2,
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
  },
  containerTotal: {
    position: "relative",
    //backgroundColor: 'rgba(45, 50, 63, 0.8)',
    backgroundColor: "rgba(225, 216, 255, 1)",
    height: 100,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    display: "flex",
    alignContent: "center"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
  textTotal: {
    color: "rgba(42, 7, 66, 1)",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginHorizontal: 60,
    marginBottom: -10,
  },
  containerMensaje: {
    height: "75%",
    alignContent: "center",
    justifyContent: "center",
  },
  textMensaje: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  messageText: {
    marginBottom: 20,
  },     
  gifImage:{
    height: 200,
    width: 200,
  },         
});