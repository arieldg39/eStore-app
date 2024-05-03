import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

 //const urlApi = 'https://017jhlsg-4000.brs.devtunnels.ms/api';
//const urlApi = 'http://192.168.100.52:4000/api/app';
//const urlApi = 'http://192.168.88.252:4000/api/app';
const urlApi = 'http://actumrh.com.ar:4000/api/app';

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