import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './reducers/RootReducer';

const saveToStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        state?.adminReducer?.rememberMe ?  window.localStorage.setItem('state', serializedState) : window.sessionStorage.setItem('state', serializedState) 
    } catch(err) {
        console.log(err);
    }
}

const loadFromStorage = () => {
    try {
        const serializedState = window.localStorage.getItem('state') === null ? window.sessionStorage.getItem('state') : window.localStorage.getItem('state');
        if(serializedState === null) return undefined
        return JSON.parse(serializedState);
    } catch(err) {
        console.log(err);
        return undefined;
    }
}

const persistedState = () => loadFromStorage();

const store = configureStore({
    reducer: RootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware(), devTools: true, preloadedState: persistedState()
});

store.subscribe(() =>saveToStorage(store.getState()));


export default store;
