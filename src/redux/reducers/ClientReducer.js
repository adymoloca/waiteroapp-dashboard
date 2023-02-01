import {
    GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS, GET_CLIENT_FAILURE,
    REMEMBER_ME_TOGGLE, CLEAN_ERROR_MESSAGE, CLEAN_CLIENT_REDUCER,
    REGISTER_CLIENT_REQUEST, REGISTER_CLIENT_SUCCESS, REGISTER_CLIENT_FAILURE,
    ADD_RESTAURANT_REQUEST, ADD_RESTAURANT_SUCCESS, ADD_RESTAURANT_FAILURE,
    GET_RESTAURANTS_REQUEST, GET_RESTAURANTS_SUCCESS, GET_RESTAURANTS_FAILURE
} from '../types/ClientTypes';

let initial = {
    loading: false,
    hasErrors: false,
    message: "",
    rememberMe: false,
    token: "",
    refreshToken: "",
    exp: 0,
    client: {
        access: "",
        email: "",
        loggedIn: false,
        name: "",
        phone: "",
        role: "",
        _id: "",
        restaurants: []
    }
}

const clientReducer = (state = initial, action) => {
    switch (action.type) {
        //Get
        case GET_CLIENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_CLIENT_SUCCESS:
            return{
                ...state,
                client: action?.payload?.client,
                message: action?.payload?.message,
                token: action?.payload?.token,
                refreshToken: action?.payload?.refreshToken,
                exp: action?.payload?.exp,
                loading: false,
                hasErrors: false
            }
        case GET_CLIENT_FAILURE:
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
        case CLEAN_CLIENT_REDUCER:
            return {
                ...initial
            }
        case REGISTER_CLIENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REGISTER_CLIENT_SUCCESS:
            return{
                ...state,
                client: {...action?.payload?.client, loggedIn: true},
                message: action?.payload?.message, 
                token: action?.payload?.token,
                refreshToken: action?.payload?.refreshToken,
                exp: action?.payload?.exp,
                loading: false,
                hasErrors: false
            }
        case REGISTER_CLIENT_FAILURE:
            return{
                ...state,
                hasErrors: true,
                message: action?.payload,
                loading: false
            }
        case ADD_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: action?.payload?.message,
                client: {
                    ...state.client,
                    restaurants: [action?.payload?.restaurant]
                }
            }
        case ADD_RESTAURANT_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action?.payload
            }
        case GET_RESTAURANTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: action?.payload?.message,
                client: {
                    ...state?.client,
                    restaurants: action?.payload?.restaurants || []
                }
            }
        case GET_RESTAURANTS_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action?.payload?.message
            }
        default: 
            return  {
                ...state
            }
    }
}

export default clientReducer;