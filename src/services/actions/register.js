// import { ThunkAction } from "redux-thunk";
// import { Action } from "redux";
import axios from "axios";
import { register } from '../actionTypes';
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
        type: register.UPDATE_FEACHING,
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
                type: register.UPDATE_VALID_EMAIL_VALUE,
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
        type: register.UPDATE_EMAIL_ERROR_FIELD,
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
            type: register.UPDATE_VALID_PASSWPRD,
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
        type: register.UPDATE_PASSWORD_ERROR_FIELD,
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
            type: register.UPDATE_VALID_REPLACE_PASSWPRD,
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
        type: register.UPDATE_REPLACE_PASSWORD_ERROR_FIELD,
        payload: { replacePassword: { containErrors: status } },
    });
};


export const updateUserType = (
    userType,
) => async(
    dispatch,
) => {
    // only numbers
    if (userType.length < 40) {
        (await dispatch({
            type: register.UPDATE_VALID_USER_TYPE,
            payload: { userType: { value: userType } },
        }));
    }
};

export const updateUserTypeErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: register.UPDATE_USER_TYPE_ERROR_FIELD,
        payload: { userType: { containErrors: status } },
    });
};


export const updateResponseRegister = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: register.GET_REGISTER_RESPONSE,
        payload: { response },
    });
};




export const submitRegisterForm = (
    status,
) => async(
    dispatch,
) => {
    let {
        email,
        password,
        replacePassword,
        userType,
    } = store.getState().register;

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
    if (userType.value !== "") {
        dispatch(updateUserTypeErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateUserTypeErrorField(true));
    }

    if (!containErrors) {

        // const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/auth/create-user", {
                        email: email.value,
                        password: password.value,
                        replacePassword: replacePassword.value,
                        userType: userType.value,
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
                        dispatch(updateResponseRegister({
                            token: response.data.token,
                            isRegister: response.data.success,
                            message: response.data.message,
                            show: true,
                        }));
                    } else {
                        dispatch(updateResponseRegister({
                            token: "",
                            isRegister: false,
                            message: response.data.message,
                            show: true,
                        }));
                    }
                })
                .catch((error) => {
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateResponseRegister({
                        token: "",
                        isRegister: false,
                        message: "An error occurred while register in",
                        show: true,
                    }));
                });
        } catch (error) {
            dispatch(updateFeaching(false));
            dispatch(updateResponseRegister({
                token: "",
                isRegister: false,
                message: "An error !! Please check your connection",
                show: true,
            }));
        }
    }
}