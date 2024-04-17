import React, { useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { globalStyles } from "../themes/globalTheme";


export const CustomDrawerContent = ({ navigation, user, orders }) => {
  const { userState, logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{user.nombre}</Text>   
          </View>
           <View style={styles.userInfoContainer}>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Nombre:</Text>
        <Text style={styles.userInfoValue}>{user.nombre}</Text>
      </View>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Usuario:</Text>
        <Text style={styles.userInfoValue}>{user.usuario}</Text>
      </View>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Acceso:</Text>
        <Text style={styles.userInfoValue}>{user.acceso}</Text>
      </View>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>ID Usuario:</Text>
        <Text style={styles.userInfoValue}>{user.idusuario}</Text>
      </View>
    </View>
      <View style={styles.menu}>
           <TouchableOpacity
                style={globalStyles.defaultBtnOutline}                    
            >
                    <Text>Mis Pedidos {orders}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                    style={globalStyles.defaultBtnOutline}
                    onPress={logout}
            >
                    <Text>Salir</Text>
            </TouchableOpacity>
      </View>
    </View>
  );

};

// Estilos para el Drawer Content
const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menu: {
    paddingTop: 20,
    paddingHorizontal: 20,
    },
  userInfoContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  userInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  userInfoLabel: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfoValue: {
    color: "#333",
    fontSize: 16,
  }
});
