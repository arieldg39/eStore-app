import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../themes/globalTheme';

export const CustomDrawerContent = ({ navigation, user,orders }) => {

    const { state, logout } = useContext(AuthContext);
    

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{user.nombre}</Text>
            </View>
            <View style={styles.menu}>
                {/* Agrega aquí tus opciones de menú */}
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
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menu: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
});
    
