import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalStyles } from "../themes/globalTheme";


export default function CustomValidationInput(props){
    const [text, setText] = useState();
    const [validationMessage, setValidationMessage] = useState();

    const handleTextChange = (input) => {
        setText(input);

        if(validationMessage){
            validate(input);            
            
        }
    };

    const validate = (input) => {
        const isValid = props.regex.test(input);
        console.log(isValid);
        if(!isValid) {
            setValidationMessage(props.validationMessage);
        }
        else{
            setValidationMessage();            
            props.onChangeUserForm('username', input);
        }
    };

    return (
        <View style={styles.container}>            
            <TextInput 
                style={globalStyles.defaultInputText}
                value={text}
                onChangeText={handleTextChange}
                onEndEditing={()=>{validate(text)}}
                {...props}
            />
            <Text style={styles.msg}> {validationMessage} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{                
        marginBottom: 5        
    },
    msg:{
        color:"red",
        paddingHorizontal:20,        
    }
});