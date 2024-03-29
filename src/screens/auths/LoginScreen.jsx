import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {globalStyles} from '../../themes/globalTheme';

export const LoginScreen = () => {


  return (
    <>
        <View style={globalStyles.container}>
            <View>              
                <Image 
                  style={styles.logo}
                  source={require('../../../assets/iconos/shop_store128.png')} 
                />
            </View>
            <View style={styles.pnText}>
                <TextInput 
                  style={globalStyles.defaultInputText}
                  placeholder='User Name'
                  placeholderTextColor={'rgba(255,255,255, 0.3)'}
                  inputMode='email'
                  name='email'
                />
                <TextInput 
                  style={globalStyles.defaultInputTextPass}
                  placeholder='Password'
                  placeholderTextColor={'rgba(255,255,255, 0.3)'} 
                  secureTextEntry={true}
                  name='password'
                />
            </View>
            <View > 
              <TouchableOpacity
                style={globalStyles.defaultBtn}
              >
                <Text Text style={globalStyles.defaulTextBtn}>Ingresar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.defaultBtnReg}
              >
                <Text style={globalStyles.defaulTextBtnReg}>Registrar</Text>
              </TouchableOpacity>
            </View>
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
