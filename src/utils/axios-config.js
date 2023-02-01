import axios from 'axios'
import store from '../redux/store'
import { adminUrl, clientsUrl } from './costants/constants'

const awaxios = axios.create({
    baseURL: adminUrl
})

awaxios.interceptors.request.use(function(config){
    config.headers.Authorization = `Bearer ${store.getState().adminReducer?.token}`;
    config.headers.contentType = 'application/json'
    return config;
})

const cwaxios = axios.create({
    baseURL: clientsUrl
})

cwaxios.interceptors.request.use(function(config){
    config.headers.Authorization = `Bearer ${store.getState().clientReducer?.token}`;
    config.headers.contentType = 'application/json'
    return config;
})

export {awaxios, cwaxios};