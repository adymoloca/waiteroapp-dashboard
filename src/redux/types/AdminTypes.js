// USER action types
// Constants
// Get
export const GET_ADMIN_REQUEST = 'GET_ADMIN_REQUEST';
export const GET_ADMIN_SUCCESS = 'GET_ADMIN_SUCCESS';
export const GET_ADMIN_FAILURE = 'GET_ADMIN_FAILURE';

export const ADD_CLIENT_REQUEST = 'ADD_CLIENT_REQUEST';
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const ADD_CLIENT_FAILURE = 'ADD_CLIENT_FAILURE';

export const GET_CLIENTS_REQUEST = 'GET_CLIENTS_REQUEST';
export const GET_CLIENTS_SUCCESS = 'GET_CLIENTS_SUCCESS';
export const GET_CLIENTS_FAILURE = 'GET_CLIENTS_FAILURE';

export const REMEMBER_ME_TOGGLE = 'REMEMBER_ME_TOGGLE';

export const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';

export const CLEAN_ADMIN_REDUCER = 'CLEAN_ADMIN_REDUCER';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

// Functions
// USER fetch functions
export const fetchAdminRequest = () => {
    return {
        type: GET_ADMIN_REQUEST
    };
};

export const fetchAdminSuccess = (response) => {
    return {
        type: GET_ADMIN_SUCCESS,
        payload: response
    };
};

export const fetchAdminFailure = (error) => {
    return {
        type: GET_ADMIN_FAILURE,
        payload: error
    };
};

export const addClientRequest = () => {
    return {
        type: ADD_CLIENT_REQUEST
    };
}

export const addClientSuccess = (response) => {
    return {
        type: ADD_CLIENT_SUCCESS,
        payload: response
    };
}

export const addClientFailure = (error) => {
    return {
        type: ADD_CLIENT_FAILURE,
        payload: error
    };
}

export const getClientsRequest = () => {
    return {
        type: GET_CLIENTS_REQUEST
    };
}

export const getClientsSuccess = (response) => {
    return {
        type: GET_CLIENTS_SUCCESS,
        payload: response
    };
}

export const getClientsFailure = (error) => {
    return {
        type: GET_CLIENTS_FAILURE,
        payload: error
    };
}

export const rememberMeToggle = (newStatus) => {
    return {
        type: REMEMBER_ME_TOGGLE,
        payload: newStatus
    };
};

export const cleanErrorMessage = () => {
    return {
        type: CLEAN_ERROR_MESSAGE
    }
}

export const cleanAdmin = () => {
    return {
        type: CLEAN_ADMIN_REDUCER
    }
}

export const getUsersRequest = () => {
    return {
        type: GET_USERS_REQUEST
    };
}

export const getUsersSuccess = (response) => {
    return {
        type: GET_USERS_SUCCESS,
        payload: response
    };
}

export const getUsersFailure = (error) => {
    return {
        type: GET_USERS_FAILURE,
        payload: error
    };
}