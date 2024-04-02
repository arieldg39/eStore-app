import axios from "axios";

const urlApi = 'http://192.168.1.9:4000/api';

export const eStoreApi = axios.create({
    baseURL: urlApi,
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':  '*',
    }
});