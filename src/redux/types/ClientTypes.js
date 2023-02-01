// CLIENT action types
export const GET_CLIENT_REQUEST = 'GET_CLIENT_REQUEST';
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS';
export const GET_CLIENT_FAILURE = 'GET_CLIENT_FAILURE';

export const REMEMBER_ME_TOGGLE = 'REMEMBER_ME_TOGGLE';

export const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';

export const CLEAN_CLIENT_REDUCER = 'CLEAN_CLIENT_REDUCER';

export const REGISTER_CLIENT_REQUEST = 'REGISTER_CLIENT_REQUEST';
export const REGISTER_CLIENT_SUCCESS = 'REGISTER_CLIENT_SUCCESS';
export const REGISTER_CLIENT_FAILURE = 'REGISTER_CLIENT_FAILURE';

export const ADD_RESTAURANT_REQUEST = 'ADD_RESTAURANT_REQUEST';
export const ADD_RESTAURANT_SUCCESS = 'ADD_RESTAURANT_SUCCESS';
export const ADD_RESTAURANT_FAILURE = 'ADD_RESTAURANT_FAILURE';

export const GET_RESTAURANTS_REQUEST = 'GET_RESTAURANTS_REQUEST';
export const GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS';
export const GET_RESTAURANTS_FAILURE = 'GET_RESTAURANTS_FAILURE';

// Functions
// CLIENT fetch functions
export const fetchClientRequest = () => {
    return {
        type: GET_CLIENT_REQUEST
    };
};

export const fetchClientSuccess = (response) => {
    return {
        type: GET_CLIENT_SUCCESS,
        payload: response
    };
};

export const fetchClientFailure = (error) => {
    return {
        type: GET_CLIENT_FAILURE,
        payload: error
    };
};

export const rememberMeToggleClient = (newStatus) => {
    return {
        type: REMEMBER_ME_TOGGLE,
        payload: newStatus
    };
};

export const cleanErrorMessageClient = () => {
    return {
        type: CLEAN_ERROR_MESSAGE
    }
}

export const cleanClient = () => {
    return {
        type: CLEAN_CLIENT_REDUCER
    }
}

export const registerClientRequest = () => {
    return {
        type: REGISTER_CLIENT_REQUEST
    };
};

export const registerClientSuccess = (response) => {
    return {
        type: REGISTER_CLIENT_SUCCESS,
        payload: response
    };
};

export const registerClientFailure = (error) => {
    return {
        type: REGISTER_CLIENT_FAILURE,
        payload: error
    };
};

export const addRestaurantRequest = () => {
    return {
        type: ADD_RESTAURANT_REQUEST
    };
};

export const addRestaurantSuccess = (response) => {
    return {
        type: ADD_RESTAURANT_SUCCESS,
        payload: response
    };
};

export const addRestaurantFailure = (error) => {
    return {
        type: ADD_RESTAURANT_FAILURE,
        payload: error
    };
};

export const getRestaurantsRequest = () => {
    return {
        type: GET_RESTAURANTS_REQUEST
    };
};

export const getRestaurantsSuccess = (response) => {
    return {
        type: GET_RESTAURANTS_SUCCESS,
        payload: response
    };
};

export const getRestaurantsFailure = (error) => {
    return {
        type: GET_RESTAURANTS_FAILURE,
        payload: error
    };
};