import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../themes/globalTheme'
import {AntDesign} from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/AuthContext';
import { CustomAlert } from '../../components/CustomAlert';
import { CustomLoadingPage } from '../../components/CustomLoadingPage';


export const RegisterScreen = () => {

    const { userState, register } = useContext(AuthContext);         
    const { navigate } =  useNavigation();
    const {formState, onInputChange}= useForm();
    const [alertVisible, setAlertVisible] = useState(false);
    const [titleAlert, setTitleAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        hamdleMessage();
        setIsLoading(userState.isLoading)  
    }, [userState])
    /*-------------------------------------------------*/
    const hamdleMessage = () => {
        console.log(userState);
        if(userState.typeError==="ok") {
            setTitleAlert("Error Leer Atte.");
            setMessageAlert(userState.errorMessage);
            setAlertVisible(true);
        }        
        if(userState.typeError==="Registrado") {
            setTitleAlert("Error Leer Atte.");
            setMessageAlert(userState.errorMessage);
            setAlertVisible(true);
        }        
    };
    /*-------------------------------------------------*/
    const handleSubmit =()=>{        
        if(formState.nombre==null || formState.nombre=="")
        {
            setTitleAlert("Error Leer Atte.");
            setMessageAlert("Ingresar el Nombre, para poder Realizar el Registro!!!");
            setAlertVisible(true);
        }else
        {
            if( formState.apellido==null || formState.apellido=="" )
            {
                setTitleAlert("Error Leer Atte.");
                setMessageAlert("Ingresar Apellido, para poder Realizar el Registro!!!");
                setAlertVisible(true);
            }else
            {
                if(formState.email==null || formState.email=="")
                {
                    setTitleAlert("Error Leer Atte.");
                    setMessageAlert("Ingresar Correo Electronico, para poder Realizar el Registro!!!");
                    setAlertVisible(true);
                }else
                {
                    if(formState.password==null || formState.password=="")
                    {
                        setTitleAlert("Error Leer Atte.");
                        setMessageAlert("Ingresar Password, para poder Realizar el Registro!!!");
                        setAlertVisible(true);
                    }else
                    {
                        console.log(formState)
                        //setIsLoading(true);
                        register(formState.nombre,formState.apellido, formState.email, formState.password); 
                    }
                }
            }
        }

    };
    /*-------------------------------------------------*/
    const hideAlert = () => {
        setAlertVisible(false);
    };
    /*-------------------------------------------------*/
    const handleVolver = ()=> {
        navigate("Login");
    };
    return (
        <View style={globalStyles.container}>
            <View>
                <Image 
                    style={styles.logo}
                    source={require('../../../assets/iconos/useradd.png')} 
                />
            </View>
            <View style={styles.pnText}>
                <TextInput 
                    style={globalStyles.defaultInputText}
                    placeholder='Nombre'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}                     
                    name='nombre'
                    onChangeText={(value) => onInputChange('nombre', value)}
                />
                <TextInput 
                    style={globalStyles.defaultInputText}
                    placeholder='Apellido'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}                     
                    name='apellido'
                    onChangeText={(value) => onInputChange('apellido', value)}
                />
                <TextInput 
                    style={globalStyles.defaultInputText}
                    placeholder='Correo electrónico'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}                     
                    name='email'
                    onChangeText={(value) => onInputChange('email', value)}
                />
                <TextInput 
                    style={globalStyles.defaultInputTextPass}
                    placeholder='Password'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'} 
                    secureTextEntry={true}
                    name='passwaord'
                    onChangeText={(value) => onInputChange('password', value)}
                />
            </View>
            { isLoading &&  <CustomLoadingPage/> }
            <View > 
                <TouchableOpacity
                    style={globalStyles.defaultBtn}
                    onPress={handleSubmit}
                >
                    <Text Text style={globalStyles.defaulTextBtn}>
                        <AntDesign 
                            name="adduser" 
                            size={28}                            
                        />
                        Resgistrar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={globalStyles.defaultBtnReg}
                    onPress={handleVolver}
                >
                    <Text style={globalStyles.defaulTextBtnReg}> 
                        <AntDesign 
                            name="back" 
                            size={28}                            
                        />
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </View>    
            <CustomAlert
                visible={alertVisible}
                title={titleAlert}
                message={messageAlert}
                onClose={hideAlert}
            />   
        </View>
    )
}
const styles = StyleSheet.create({
    logo:{
        marginTop: 5,
        width: 94,
        height: 94,
        alignSelf: 'center',        
    },
    pnText: {
        marginTop: 30,
        marginBottom: 10,
    }

});
