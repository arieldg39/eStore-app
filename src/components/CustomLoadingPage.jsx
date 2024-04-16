import React from 'react'
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native'

export const CustomLoadingPage = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color='#f2058b' />
    </View>
    )    
}

const styles = StyleSheet.create({
    container: {        
        justifyContent: 'center',
        position: 'fixed',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',              
    },
});
