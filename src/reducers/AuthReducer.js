import { types } from "../types/types";

export const AuthReducer = (state={}, action) => {  
    switch (action.type) {
        case types.auth.login:
            return {
                ...state,
                user: action.payload.user,
                isLogged: true,
                isLoading: false,
                errorMessage: ''
            }

            case types.auth.error:
            return {
                ...state,
                user: null,
                isLogged: false,
                isLoading:false,
                errorMessage: action.payload.errorMessage,
                typeError:action.payload.typeError
            }

        case types.auth.logout:
            return {
                ...state,
                user: null,
                isLogged: false,
                isLoading:false,
                errorMessage:  ''
            }

        case types.auth.register:
            return {
                ...state,
                user: null,
                isLogged: false,
                isLoading:false,
                errorMessage:action.payload.msg,
                typeError:action.payload.typeError
            }

        
        default: return state;
    }
}