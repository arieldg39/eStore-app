import { useReducer } from "react";
import { AuthContext } from "../context/AuthContext"
import { AuthReducer } from "../reducers/AuthReducer"
import { eStoreApi } from "../config/eStoreAxios";
import { types } from "../types/types";

const initialState  = {
    user: null,
    isLogged: false,
    isLoading: true,
    errorMessage: ''
}

export const AuthProvider = ({ children}) => {

    const [state, dispatch] = useReducer(AuthReducer,  initialState);

    const login = async(username, password) =>  {
        try {

            const user = await eStoreApi.post('/auth/login', {
                username,
                password
            });

            console.log(user);

            //await AsyncStorage.setItem('e-token', user.data.res.token);    
             dispatch({
                type: types.auth.login,
                payload: {
                    user: user.data.dataUser
                }
            }); 
            
        } catch (error) {
            //console.log(error)                                     
            dispatch({
                type: types.auth.error,
                payload:  {
                    errorMessage: error.response.data.message,
                    typeError: error.response.data.tipoerror
                }
            }) 
            
        }
    }

    const logout = () => {      
        dispatch({
            type: types.auth.logout,
        })
    }
    return(
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};