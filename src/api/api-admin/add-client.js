import axios from "axios";
import { addClientRequest, addClientSuccess, addClientFailure } from "../../redux/types/AdminTypes";
import { clientsUrl } from "../../utils/costants/constants";
import { getClients } from "./admin-requests";

export const addClient = (name, email, phone, password, loadingSetter = () => undefined, closeModalAddClient = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(addClientRequest());
        axios.post(clientsUrl + 'register', {
            name: name,
            email: email,
            phone: phone,
            password: password
        }).then((res) => {
            dispatch(addClientSuccess(res.data));
            closeModalAddClient(false);
        }).catch((error) => {
            dispatch(addClientFailure(error?.response?.data?.message));
        }).finally(() => {
            loadingSetter(false);
            dispatch(getClients());
            window.location.reload();
        })
    }
}