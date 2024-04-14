import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {globalStyles} from '../../themes/globalTheme';
import { AuthContext } from '../../context/AuthContext';
import {useForm  } from '../../hooks/useForm';
import CustomInputEmail from '../../components/CustomInputEmail';
import { CustomAlert } from '../../components/CustomAlert';
import { CustomLoading } from '../../components/CustomLoading';

export const LoginScreen = () => {

    const { login, state } = useContext(AuthContext); 
    const {formState, onInputChange}= useForm();
    const [alertVisible, setAlertVisible] = useState(false);
    const [titleAlert, setTitleAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      hamdleMessage();
      setIsLoading(state.isLoading)

    }, [state])
    ///////// PROCEDIMIENTO PARA VERICAR EL ESTADO TIENE MENSAJE DE ERROR  ///////////////////////
    const hamdleMessage = () => {
      console.log(state);
      if(state.typeError==="NoRegistra") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(state.errorMessage);
          setAlertVisible(true);
      }
      if(state.typeError==="maldatos") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(state.errorMessage);
          setAlertVisible(true);
      }
      if(state.typeError==="errorDatos") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(state.errorMessage);
          setAlertVisible(true);
      }
      if(state.typeError==="SinConex") {
          setTitleAlert("Error Leer Atte.");
          setMessageAlert(state.errorMessage);
          setAlertVisible(true);
      }
    };
    const hideAlert = () => {
      setAlertVisible(false);
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
        { isLoading &&  <CustomLoading/> }
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
            <View > 
              <TouchableOpacity
                style={globalStyles.defaultBtn}
                onPress={handleSubmit}
              >
                <Text Text style={globalStyles.defaulTextBtn}>Ingresar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={globalStyles.defaultBtnReg}
              >
                <Text style={globalStyles.defaulTextBtnReg}>Registrar</Text>
              </TouchableOpacity>
            </View>
            <CustomAlert
              visible={alertVisible}
              title={titleAlert}
              message={messageAlert}
              onClose={hideAlert}
            />
        </View>
    </>
  )
}

const styles = StyleSheet.create({

    logo:{
      marginTop: 20,
      width: 128,
      height: 128,
      alignSelf: 'center',
    },
    pnText: {
      marginTop: 30,
      marginBottom: 10,
    }

});
