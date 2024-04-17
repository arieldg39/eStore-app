import React, { useContext, useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {globalStyles} from '../../themes/globalTheme';
import { AuthContext } from '../../context/AuthContext';
import {useForm  } from '../../hooks/useForm';
import CustomInputEmail from '../../components/CustomInputEmail';
import { CustomAlert } from '../../components/CustomAlert';
import { CustomLoadingPage } from '../../components/CustomLoadingPage';
import { useNavigation } from '@react-navigation/native';
import {AntDesign} from 'react-native-vector-icons';

export const LoginScreen = () => {

    const { login, userState } = useContext(AuthContext); 
    const {formState, onInputChange}= useForm();
    const [alertVisible, setAlertVisible] = useState(false);
    const [titleAlert, setTitleAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { navigate } =  useNavigation();

    useEffect(() => {
      hamdleMessage();

      setIsLoading(userState.isLoading)

    }, [userState])
    ///////// PROCEDIMIENTO PARA VERICAR EL ESTADO TIENE MENSAJE DE ERROR  ///////////////////////
    const hamdleMessage = () => {
      console.log(userState);
      if(userState.typeError==="NoRegistra") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(userState.errorMessage);
          setAlertVisible(true);
      }
      if(userState.typeError==="maldatos") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(userState.errorMessage);
          setAlertVisible(true);
      }
      if(userState.typeError==="errorDatos") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(userState.errorMessage);
          setAlertVisible(true);
      }
      if(userState.typeError==="SinConex") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(userState.errorMessage);
          setAlertVisible(true);
      }
    };
    const hideAlert = () => {
      setAlertVisible(false);
    };

    ///////// FUNSION PARA REGISTAR USUARIOS NUEVOS  ///////////////////////
    const handleRegister = ()=> {
      navigate('Register');
    };
    ///////// FUNSION PARA INGRESAR EL SISTEMA  ///////////////////////
    const handleSubmit = ()=> {
      console.log(formState);          
      if(formState.username==="")
      {
        setTitleAlert("Error Leer Atte.");
        setMessageAlert("Ingresar el Email, para poder Realizar Realizar Login!!!");
        setAlertVisible(true);
      }else
      {
        if(formState.password==="")
        {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert("Ingresar el Password, para poder Realizar ingreso al Sistema!!!");
          setAlertVisible(true);
        }else
        {
          setIsLoading(true);
          login(formState.username, formState.password);      
        }
      }
    };


  return (
    <>        
        <KeyboardAvoidingView
          //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>

        <View style={globalStyles.container}>
            <View>              
                <Image 
                  style={styles.logo}
                  source={require('../../../assets/iconos/shop_store128.png')} 
                />
            </View>
            <View style={styles.pnText}>                                        
                <CustomInputEmail 
                    placeholder="Email"
                    placeholderTextColor={'rgba(255,255,255, 0.3)'}
                    inputMode='text'
                    name='username'
                    autoFocus = {true}
                    regex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/}
                    validationMessage="Please enter a valid email address"
                    //onChangeText={(value) => onInputChange('username', value)}
                    onChangeUserForm={onInputChange}
                />
                <TextInput 
                    style={globalStyles.defaultInputTextPass}
                    placeholder='Password'
                    placeholderTextColor={'rgba(255,255,255, 0.3)'} 
                    secureTextEntry={true}
                    name='password'
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
                            name="login" 
                            size={28}                            
                        />
                        Ingresar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={globalStyles.defaultBtnReg}
                  onPress={handleRegister}
                >
                  <Text style={globalStyles.defaulTextBtnReg}>
                        <AntDesign 
                            name="adduser" 
                            size={28}                            
                        />
                      Registrar
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
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

    logo:{
      marginTop: 20,
      width: 94,
      height: 94,
      alignSelf: 'center',
    },
    pnText: {
      marginTop: 30,
      marginBottom: 10,
    }

});
