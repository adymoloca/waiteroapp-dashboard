import { awaxios } from "../../utils/axios-config";
import { getClientsRequest, getClientsSuccess, getClientsFailure, getUsersRequest, getUsersSuccess, getUsersFailure } from "../../redux/types/AdminTypes";

export const getClients = (loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getClientsRequest());
        awaxios.get('get-clients').then((res) => {
            dispatch(getClientsSuccess(res.data));
        }).catch((error) => {
            dispatch(getClientsFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}

export const updateClientStatus = async (isBlocked, clientId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalUpdate = () => undefined) => {
    loadingSetter(true);
    awaxios.patch(`/client/${clientId}/update-client`, {
        isBlocked: isBlocked
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalUpdate();
    })
}

export const deleteClient = async (clientId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    awaxios.delete(`/delete-client`, {
        data: { clientId: clientId }
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}

export const getUsers = (loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getUsersRequest());
        awaxios.get('get-users').then((res) => {
            dispatch(getUsersSuccess(res.data));
        }).catch((error) => {
            dispatch(getUsersFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}

export const deleteUser = async (userId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    awaxios.delete(`/delete-user`, {
        data: { userId: userId }
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}