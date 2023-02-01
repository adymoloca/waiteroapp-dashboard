// CLIENT action types
export const GET_RESTAURANT_REQUEST = 'GET_RESTAURANT_REQUEST';
export const GET_RESTAURANT_SUCCESS = 'GET_RESTAURANT_SUCCESS';
export const GET_RESTAURANT_FAILURE = 'GET_RESTAURANT_FAILURE';

export const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';

export const CLEAN_RESTAURANT_REDUCER = 'CLEAN_RESTAURANT_REDUCER';

export const GET_MENUS_REQUEST = 'GET_MENUS_REQUEST';
export const GET_MENUS_SUCCESS = 'GET_MENUS_SUCCESS';
export const GET_MENUS_FAILURE = 'GET_MENUS_FAILURE';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const GET_PLATES_REQUEST = 'GET_PLATES_REQUEST';
export const GET_PLATES_SUCCESS = 'GET_PLATES_SUCCESS';
export const GET_PLATES_FAILURE = 'GET_PLATES_FAILURE';

export const GET_DRINKS_REQUEST = 'GET_DRINKS_REQUEST';
export const GET_DRINKS_SUCCESS = 'GET_DRINKS_SUCCESS';
export const GET_DRINKS_FAILURE = 'GET_DRINKS_FAILURE';

export const GET_EXTRA_REQUEST = 'GET_EXTRA_REQUEST';
export const GET_EXTRA_SUCCESS = 'GET_EXTRA_SUCCESS';
export const GET_EXTRA_FAILURE = 'GET_EXTRA_FAILURE';

export const GET_TABLES_REQUEST = 'GET_TABLES_REQUEST';
export const GET_TABLES_SUCCESS = 'GET_TABLES_SUCCESS';
export const GET_TABLES_FAILURE = 'GET_TABLES_FAILURE';

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';
export const UPDATE_ORDERS_COOKED =  'UPDATE_ORDERS_COOKED';

export const GET_CHECKOUTS_REQUEST = 'GET_CHECKOUTS_REQUEST';
export const GET_CHECKOUTS_SUCCESS = 'GET_CHECKOUTS_SUCCESS';
export const GET_CHECKOUTS_FAILURE = 'GET_CHECKOUTS_FAILURE';

// Functions
// CLIENT fetch functions
export const fetchRestaurantRequest = () => {
    return {
        type: GET_RESTAURANT_REQUEST
    };
};

export const fetchRestaurantSuccess = (response) => {
    return {
        type: GET_RESTAURANT_SUCCESS,
        payload: response
    };
};

export const fetchRestaurantFailure = (error) => {
    return {
        type: GET_RESTAURANT_FAILURE,
        payload: error
    };
};

export const cleanErrorMessageRestaurant = () => {
    return {
        type: CLEAN_ERROR_MESSAGE
    }
}

export const cleanRestaurant = () => {
    return {
        type: CLEAN_RESTAURANT_REDUCER
    }
}

export const getMenusRequest = () => {
    return {
        type: GET_MENUS_REQUEST
    };
};

export const getMenusSuccess = (response) => {
    return {
        type: GET_MENUS_SUCCESS,
        payload: response
    };
};

export const getMenusFailure = (error) => {
    return {
        type: GET_MENUS_FAILURE,
        payload: error
    };
};

export const getCategoriesRequest = () => {
    return {
        type: GET_CATEGORIES_REQUEST
    };
};

export const getCategoriesSuccess = (response) => {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload: response
    };
};

export const getCategoriesFailure = (error) => {
    return {
        type: GET_CATEGORIES_FAILURE,
        payload: error
    };
};

export const getPlatesRequest = () => {
    return {
        type: GET_PLATES_REQUEST
    };
};

export const getPlatesSuccess = (response) => {
    return {
        type: GET_PLATES_SUCCESS,
        payload: response
    };
};

export const getPlatesFailure = (error) => {
    return {
        type: GET_PLATES_FAILURE,
        payload: error
    };
};

export const getDrinksRequest = () => {
    return {
        type: GET_DRINKS_REQUEST
    };
};

export const getDrinksSuccess = (response) => {
    return {
        type: GET_DRINKS_SUCCESS,
        payload: response
    };
};

export const getDrinksFailure = (error) => {
    return {
        type: GET_DRINKS_FAILURE,
        payload: error
    };
};

export const getExtraRequest = () => {
    return {
        type: GET_EXTRA_REQUEST
    };
};

export const getExtraSuccess = (response) => {
    return {
        type: GET_EXTRA_SUCCESS,
        payload: response
    };
};

export const getExtraFailure = (error) => {
    return {
        type: GET_EXTRA_FAILURE,
        payload: error
    };
};

export const getTablesRequest = () => {
    return {
        type: GET_TABLES_REQUEST,
    };
};

export const getTablesSuccess = (response) => {
    return {
        type: GET_TABLES_SUCCESS,
        payload: response
    };
};

export const getTablesFailure = (error) => {
    return {
        type: GET_TABLES_FAILURE,
        payload: error
    };
};

export const getOrdersRequest = () => {
    return {
        type: GET_ORDERS_REQUEST,
    };
};

export const getOrdersSuccess = (response) => {
    return {
        type: GET_ORDERS_SUCCESS,
        payload: response
    };
};

export const getOrdersFailure = (error) => {
    return {
        type: GET_ORDERS_FAILURE,
        payload: error
    };
};

export const updateOrdersCooked = (orders) => {
    return {
        type: UPDATE_ORDERS_COOKED,
        payload: orders
    }
}

export const getCheckoutsRequest = () => {
    return {
        type: GET_CHECKOUTS_REQUEST,
    };
};

export const getCheckoutsSuccess = (response) => {
    return {
        type: GET_CHECKOUTS_SUCCESS,
        payload: response
    };
};

export const getCheckoutsFailure = (error) => {
    return {
        type: GET_CHECKOUTS_FAILURE,
        payload: error
    };
};