import { baseUrl }from '../../utils/costants/constants';
import { fetchAdminRequest, fetchAdminSuccess, fetchAdminFailure } from '../../redux/types/AdminTypes';
import axios from 'axios';

export const loginA = (email, password, loadingSetter = () => undefined, setNavigation = () => undefined) => {
    const loginPath = 'admins/login'
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(fetchAdminRequest())
        axios.post(baseUrl + loginPath, {
            email: email,
            password: password
        }).then(res => {
            dispatch(fetchAdminSuccess(res?.data))
            setNavigation('/home');
        }).catch(error => {
            dispatch(fetchAdminFailure(error?.response?.data?.error))
        }).finally(() => {
            loadingSetter(false);
        })  
    }
}

