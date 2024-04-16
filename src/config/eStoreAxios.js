import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//const urlApi = 'http://192.168.1.9:4000/api';
const urlApi = 'http://192.168.88.252:4000/api';

export const eStoreApi = axios.create({
    baseURL: urlApi,
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':  '*',
    }
});

eStoreApi.interceptors.request.use(

    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = token;
        }
        return config;
    }
)