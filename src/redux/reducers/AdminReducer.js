import {
    GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS, GET_ADMIN_FAILURE,
    REMEMBER_ME_TOGGLE, CLEAN_ERROR_MESSAGE, CLEAN_ADMIN_REDUCER, 
    ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAILURE,
    GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAILURE,
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE
} from '../types/AdminTypes';

let initial = {
    loading: false,
    hasErrors: false,
    message: "",
    rememberMe: false,
    token: "",
    refreshToken: "",
    exp: 0,
    admin: {
        access: "",
        email: "",
        loggedIn: false,
        name: "",
        phone: "",
        role: "",
        _id: ""
    },
    clients: [],
    users: []
}

const adminReducer = (state = initial, action) => {
    switch (action.type) {
        //Get
        case GET_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_SUCCESS:
            return{
                ...state,
                admin: action?.payload?.admin,
                message: action?.payload?.message, 
                token: action?.payload?.token,
                refreshToken: action?.payload?.refreshToken,
                exp: action?.payload?.exp,
                loading: false,
                hasErrors: false
            }
        case GET_ADMIN_FAILURE:
            return{
                ...state,
                hasErrors: true,
                message: action?.payload,
                loading: false
            }
        case REMEMBER_ME_TOGGLE:
            return {
                ...state,
                rememberMe: action?.payload
            }
        case CLEAN_ERROR_MESSAGE: 
            return {
                ...state,
                message: '',
                hasErrors: false
            }
        case CLEAN_ADMIN_REDUCER:
            return {
                ...initial
            }
        case ADD_CLIENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: action?.payload?.message,
            }
        case ADD_CLIENT_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action?.payload
            }
        case GET_CLIENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CLIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: action?.payload?.message,
                clients: action?.payload?.clients
            }
        case GET_CLIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action?.payload
            }
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: action?.payload?.message,
                users: action?.payload?.users
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action?.payload
            }
        default: 
            return  {
                ...state
            }
    }
}

export default adminReducer;