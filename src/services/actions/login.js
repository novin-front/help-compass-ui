// import { ThunkAction } from "redux-thunk";
// import { Action } from "redux";
import axios from "axios";
import { login } from '../actionTypes';
// import {registerState} from '../reducers/index';
import { IsValidEmail, passwordValidation } from "../function";
import { store } from "../store";
import { updateResponseUserInfo } from "./dashboard";
// import browserHistory from "../browserHistory";
export const updateFeaching = (
    status
) => async(
    dispatch,
) => {
    (await dispatch({
        type: login.UPDATE_FEACHING,
        payload: { feaching: status },
    }));
};
export const updateEmail = (
    email,
) => async(
    dispatch,
) => {
    const lastChar = email[email.length - 1];
    if (lastChar === undefined || /^[a-z0-9.-]/.test(email)) {
        email.length <= 40 &&
            (await dispatch({
                type: login.UPDATE_VALID_EMAIL_VALUE,
                payload: { email: { value: email } },
            }));
    }
};

export const updateEmailErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: login.UPDATE_EMAIL_ERROR_FIELD,
        payload: { email: { containErrors: status } },
    });
};

export const updatePassword = (
    passwrod,
) => async(
    dispatch,
) => {
    const lastChar = passwrod[passwrod.length - 1];
    // only numbers
    if (lastChar === undefined || passwrod.length < 30) {
        (await dispatch({
            type: login.UPDATE_VALID_PASSWPRD,
            payload: { passwrod: { value: passwrod } },
        }));
    }
};

export const updatePasswordErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: login.UPDATE_PASSWORD_ERROR_FIELD,
        payload: { password: { containErrors: status } },
    });
};


export const updateResponseLogin = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: login.GET_LOGIN_RESPONSE,
        payload: { response },
    });
};




export const submitLoginForm = (
    status,
) => async(
    dispatch,
) => {
    let {
        email,
        password
    } = store.getState().login;

    let containErrors = false;
    if (passwordValidation(password.value)) {
        dispatch(updatePasswordErrorField(false));
    } else {
        containErrors = true;
        dispatch(updatePasswordErrorField(true));
    }

    if (IsValidEmail(email.value)) {
        dispatch(updateEmailErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateEmailErrorField(true));

    }

    if (!containErrors) {

        // const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));

        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/auth/login", {
                        email: email.value,
                        password: password.value,
                    }, {
                        headers: {
                            // 'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateResponseLogin({
                            token: response.data.token,
                            isLogin: response.data.success,
                            message: response.data.message,
                            show: true,
                            profileStatus: response.data.profile_status,
                            activated: response.data.activated,
                            role: response.data.role,
                        }));
                        dispatch(updateResponseUserInfo(response.data));
                    } else {
                        dispatch(updateResponseLogin({
                            token: "",
                            isLogin: false,
                            message: response.data.message,
                            show: true,
                            profileStatus: "",
                            activated: "",
                            role: ""
                        }));
                    }
                })
                .catch((error) => {
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateResponseLogin({
                        token: "",
                        isLogin: false,
                        message: "An error occurred while logging in",
                        show: true,
                        profileStatus: "",
                        activated: "",
                        role: ""
                    }));
                });
        } catch (error) {
            dispatch(updateFeaching(false));
            dispatch(updateResponseLogin({
                token: "",
                isLogin: false,
                message: "An error !! Please check your connection",
                show: true,
                profileStatus: false,
                activated: false,
            }));
        }
    }
}