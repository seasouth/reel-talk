import {
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './authTypes';

export const authenticateUser = (username, password) => {
    console.log(username, password);
    return dispatch => {
        dispatch(loginRequest());
        if (username === "test" && password === "test") {
            console.log("success");
            dispatch(loginSuccess());
        } else {
            console.log("failure");
            dispatch(loginFailure());
        }
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutRequest());
    }
}

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
    payload: false
})

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS,
        payload: true
    }
}

export const loginFailure = () => {
    return {
        type: LOGIN_FAILURE,
        payload: false
    }
}