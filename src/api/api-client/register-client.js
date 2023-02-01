import axios from "axios";
import { registerClientRequest, registerClientSuccess, registerClientFailure } from "../../redux/types/ClientTypes";
import { clientsUrl } from "../../utils/costants/constants";

export const registerClient = (name, email, phone, password, loadingSetter = () => undefined, setNavigation = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(registerClientRequest());
        axios.post(clientsUrl + 'register', {
            name: name,
            email: email,
            phone: phone,
            password: password
        }).then((res) => {
            dispatch(registerClientSuccess(res.data));
            setNavigation('/on-boarding')
        }).catch((error) => {
            dispatch(registerClientFailure(error?.response?.data?.message));
        }).finally(() => {
            loadingSetter(false);
        })
    }
}