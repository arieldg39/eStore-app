import axios from "axios";

const urlApi = 'http://localhost:3031/api';

export const eShopApiUrl = axios.create({
    baseURL: urlApi,
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':  '*',
    }
});