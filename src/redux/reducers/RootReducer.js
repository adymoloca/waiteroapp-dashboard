import adminReducer from './AdminReducer';
import clientReducer from './ClientReducer';
import restaurantReducer from './RestaurantReducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    //User Reducer
    adminReducer: adminReducer,
    clientReducer: clientReducer,
    restaurantReducer: restaurantReducer
})

export default RootReducer;