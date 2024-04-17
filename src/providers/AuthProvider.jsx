import { useReducer } from "react";
import { AuthContext } from "../context/AuthContext"
import { AuthReducer } from "../reducers/AuthReducer"
import { eStoreApi } from "../config/eStoreAxios";
import { types } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState  = {
    user: null,
    isLogged: false,
    isLoading: true,
    errorMessage: ''
}

export const AuthProvider = ({ children}) => {

    const [userState, dispatch] = useReducer(AuthReducer,  initialState);
    /*------------------------------Login-------------------------------------------*/
    const login = async(username, password) =>  {
        try {
            const user = await eStoreApi.post('/auth/login', {
                username,
                password
            });
            //console.log(user);
            await AsyncStorage.setItem('token', user.data.token);
            dispatch({
                type: types.auth.login,
                payload: {
                    user: user.data.dataUser
                }
            }); 
            
        } catch (error) {
            console.log(error)            
            if(error.code==="ERR_NETWORK"){
                dispatch({
                    type: types.auth.error,
                    payload:  {
                        errorMessage: "Sin Conexion con el Servidor de Datos, intente mas tardes!!!",
                        typeError: "SinConex"
                    }
                }) 
            }else{
                dispatch({
                    type: types.auth.error,
                    payload:  {
                        errorMessage: error.response.data.message,
                        typeError: error.response.data.tipoerror
                    }
                }) 
            }
            
        }
    }
    /*------------------------------Check Token-------------------------------------------*/
    const checkToken = async() => {
        try {                        
            const { data } = await eStoreApi.get('/auth/token');
            console.log(data);
            dispatch({
                type: types.auth.login,
                payload: {
                    user: data.dataUser
                }
            }); 
            
        } catch (error) {
            //console.log("Error: "+error);
            dispatch({
                type: types.auth.logout,                
            }) 
        }
    }
    /*------------------------------Logout-------------------------------------------*/
    const register = async(nombre,apellido,email,password) =>  {
        try {
            const user = await eStoreApi.post('/auth/registerapp', {
                nombre,
                apellido,
                usuario: email,
                clave:password,
                acceso: "customer",
                fechaalta: new Date().toISOString().split('T')[0],
                avatar:"avatar.png"
            });
            console.log(user);
            //await AsyncStorage.setItem('token', user.data.token);
            dispatch({
                type: types.auth.register,
                payload: {
                    msg: user.data.message,
                    typeError:"ok"
                }
            }); 
            
        } catch (error) {
            console.log(error)            
            if(error.code==="ERR_NETWORK"){
                dispatch({
                    type: types.auth.error,
                    payload:  {
                        errorMessage: "Sin Conexion con el Servidor de Datos, intente mas tardes!!!",
                        typeError: "SinConex"
                    }
                }) 
            }else{
                dispatch({
                    type: types.auth.error,
                    payload:  {
                        errorMessage: error.response.data.message,
                        typeError: error.response.data.tipoerror
                    }
                }) 
            }
            
        }
    }
    /*------------------------------Logout-------------------------------------------*/
    const logout = async() => {      
        dispatch({
            type: types.auth.logout,
        })
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('cartStorage');
    }
    return(
        <AuthContext.Provider
            value={{
                userState,
                login,
                logout,
                checkToken,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};