import React from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';
import { globalStyles } from '../themes/globalTheme';


export const CustomLoading = () => {

  return (
    <View style={[globalStyles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color='#f2058b' />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,        
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
