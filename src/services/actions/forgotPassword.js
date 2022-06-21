// import { ThunkAction } from "redux-thunk";
// import { Action } from "redux";
import axios from "axios";
import { forgotPassword } from '../actionTypes';
// import {registerState} from '../reducers/index';
import { IsValidEmail, passwordValidation } from "../function";
import { store } from "../store";
// import browserHistory from "../browserHistory";

export const updateFeaching = (
    status
) => async(
    dispatch,
) => {
    (await dispatch({
        type: forgotPassword.UPDATE_FEACHING,
        payload: { feaching: status },
    }));
};
export const updateChangePasswordFeaching = (
    status
) => async(
    dispatch,
) => {
    (await dispatch({
        type: forgotPassword.UPDATE_CHANGE_PASSWORD_FEACHING,
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
                type: forgotPassword.UPDATE_VALID_EMAIL_VALUE,
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
        type: forgotPassword.UPDATE_EMAIL_ERROR_FIELD,
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
            type: forgotPassword.UPDATE_VALID_PASSWPRD,
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
        type: forgotPassword.UPDATE_PASSWORD_ERROR_FIELD,
        payload: { password: { containErrors: status } },
    });
};

export const updateReplacePassword = (
    replacePassword,
) => async(
    dispatch,
) => {
    const lastChar = replacePassword[replacePassword.length - 1];
    // only numbers
    if (lastChar === undefined || replacePassword.length < 30) {
        (await dispatch({
            type: forgotPassword.UPDATE_VALID_REPLACE_PASSWPRD,
            payload: { replacePassword: { value: replacePassword } },
        }));
    }
};

export const updateReplacePasswordErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: forgotPassword.UPDATE_REPLACE_PASSWORD_ERROR_FIELD,
        payload: { replacePassword: { containErrors: status } },
    });
};



export const updateResponseForgotPassword = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: forgotPassword.GET_FORGOT_PASSWORD_RESPONSE,
        payload: { response },
    });
};
export const updateResponseChangePassword = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: forgotPassword.GET_FORGOT_CHANGE_PASSWORD_RESPONSE,
        payload: { response },
    });
};


export const submitForgotPasswordForm = (
    status,
) => async(
    dispatch,
) => {
    let {
        email,
    } = store.getState().register;

    let containErrors = false;
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
                    "api/v1/auth/forgot-password", {
                        email: email.value,
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
                        dispatch(updateResponseForgotPassword({
                            token: response.data.token,
                            isForgotPassword: response.data.success,
                            message: response.data.message,
                            show: true,
                        }));
                    } else {
                        dispatch(updateResponseForgotPassword({
                            token: "",
                            isForgotPassword: false,
                            message: response.data.message,
                            show: true,
                        }));
                    }
                })
                .catch((error) => {
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateResponseForgotPassword({
                        token: "",
                        isForgotPassword: false,
                        message: "An Error forgetting password",
                        show: true,
                    }));
                });
        } catch (error) {
            dispatch(updateFeaching(false));
            dispatch(updateResponseForgotPassword({
                token: "",
                isForgotPassword: false,
                message: "An error !! Please check your connection",
                show: true,
            }));
        }
    }
}

export const submitChangePasswordForm = (
    status,
) => async(
    dispatch,
) => {
    let {
        email,
        password,
        replacePassword,
    } = store.getState().forgotPassword;
    let containErrors = false;
    if (IsValidEmail(email.value)) {
        dispatch(updateEmailErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateEmailErrorField(true));

    }

    if (passwordValidation(password.value)) {
        dispatch(updatePasswordErrorField(false));
    } else {
        containErrors = true;
        dispatch(updatePasswordErrorField(true));
    }
    if (replacePassword.value === password.value) {
        dispatch(updateReplacePasswordErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateReplacePasswordErrorField(true));
    }

    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateChangePasswordFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/auth/change-password", {
                        email: email.value,
                        password: password.value,
                        replacePassword: replacePassword.value,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateChangePasswordFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateResponseChangePassword({
                            token: response.data.token,
                            isChangePassword: response.data.success,
                            message: response.data.message,
                            show: true,
                        }));
                    } else {
                        dispatch(updateResponseChangePassword({
                            token: "",
                            isChangePassword: false,
                            message: response.data.message,
                            show: true,
                        }));
                    }
                })
                .catch((error) => {
                    dispatch(updateChangePasswordFeaching(false));
                    console.log(error);
                    dispatch(updateResponseChangePassword({
                        token: "",
                        isChangePassword: false,
                        message: "An Error changing password",
                        show: true,
                    }));
                });
        } catch (error) {
            dispatch(updateChangePasswordFeaching(false));
            dispatch(updateResponseChangePassword({
                token: "",
                isChangePassword: false,
                message: "An error !! Please check your connection",
                show: true,
            }));
        }
    }
}