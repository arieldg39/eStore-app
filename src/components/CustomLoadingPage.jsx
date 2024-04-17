import React from 'react'
import { ActivityIndicator, Image, ImageBackground, Modal, StyleSheet, View } from 'react-native'

export const CustomLoadingPage = ({ visible, onClose }) => {
    return (        
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* <Image source={gifSource} style={styles.gifImage} />                                         */}
                        <ActivityIndicator  color='#f2058b'  size='large'/>
                    </View>
                </View>
            </Modal>
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
        backgroundColor: "transparent",
      },
      messageText: {
        marginBottom: 20,
      },     
      gifImage:{        
        fontSize: 125
      },         
});
