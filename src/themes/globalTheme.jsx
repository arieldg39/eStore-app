import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 7,
        paddingTop: 15,
        paddingBottom: 80
    },
    footer: {
        fontSize: 13,
        color: 'rgba(255,255,255, 0.3)',
        alignSelf: 'center',
        marginVertical: 20,
    },

    defaultBtn: {
        backgroundColor:  '#f2058b',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 100,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 20,
    },
    defaultBtnReg: {
        backgroundColor:  '#9A2EFE',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 100,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 20,
    },

    defaulTextBtn: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500'
    },
    defaulTextBtnReg: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500'
    },

    defaultBtnOutline: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 20,
        borderColor:'#f2058b',
        borderWidth: 2,
    },

    defaultBtnQuantity: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: 20,
        borderColor:'#f2058b',
        borderWidth: 2,
    },

    defaultInputText:  {
        borderWidth:2,
        borderColor: '#f2058b',
        borderRadius: 40,
        paddingVertical: 5,
        marginHorizontal: 15,
        marginVertical: 15,
        paddingHorizontal: 5,
        color: '#fff'
    },
    defaultInputTextPass:  {
        borderWidth:2,
        borderColor: '#f2058b',
        borderRadius: 40,
        paddingVertical: 7,
        marginHorizontal: 15,
        marginVertical: 12,
        paddingHorizontal: 12,
        color: '#fff'        
    },

    defaultDividrTitile: {
        flex:1,
        backgroundColor: 'rgba(255,255,255, 0.1)',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:5,
        marginBottom: 20
    },

    defaultDivideTitleText: {
        color: 'rgba(255,255,255, 0.6)',
        fontSize: 18,
        fontWeight: '600'
    }


});