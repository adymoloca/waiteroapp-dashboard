import { clientsUrl }from '../../utils/costants/constants';
import { fetchClientRequest, fetchClientSuccess, fetchClientFailure } from '../../redux/types/ClientTypes';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const loginC = (email, password, loadingSetter = () => undefined, setNavigation = () => undefined) => {
    const loginPath = 'login'
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(fetchClientRequest())
        axios.post(clientsUrl + loginPath, {
            email: email,
            password: password
        }, { headers: { 'Content-Type': 'application/json' } }).then(res => {
            const { exp } = jwt.decode(res?.data?.token)
            dispatch(fetchClientSuccess({...res.data, exp}))
            res.data?.client?.restaurants?.length > 0 ? setNavigation('/overview') : setNavigation('/on-boarding') ;
        }).catch(error => {
            dispatch(fetchClientFailure(error?.response?.data?.error))
        }).finally(() => {
            loadingSetter(false);
        })  
    }
}

