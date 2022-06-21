import {
    forgotPassword
} from '../actionTypes';
export const forgotPasswordState = {
    feaching: false,
    feachingChangePassword: false,
    email: {
        value: "",
        containErrors: false,
    },
    password: {
        value: "",
        containErrors: false,
    },
    replacePassword: {
        value: "",
        containErrors: false,
    },
    userIsForgotPassword: {
        token: "",
        success: false,
        show: false,
        message: ""
    },
    userIsChangePassword: {
        token: "",
        success: false,
        show: false,
        message: ""
    },
}
export const forgotPasswordReducer = (state = forgotPasswordState, action) => {
    switch (action.type) {
        case forgotPassword.UPDATE_FEACHING:
            return {
                ...state,
                feaching: action.payload.feaching,
            };
        case forgotPassword.UPDATE_CHANGE_PASSWORD_FEACHING:
            return {
                ...state,
                feachingChangePassword: action.payload.feaching,
            };
        case forgotPassword.UPDATE_VALID_EMAIL_VALUE:
            return {
                ...state,
                email: {
                    ...state.email,
                    value: action.payload.email.value,
                }
            };

        case forgotPassword.UPDATE_EMAIL_ERROR_FIELD:
            return {
                ...state,
                email: {
                    ...state.email,
                    containErrors: action.payload.email.containErrors,
                }
            };

        case forgotPassword.UPDATE_VALID_PASSWPRD:
            return {
                ...state,
                password: {
                    ...state.password,
                    value: action.payload.passwrod.value,
                }
            };

        case forgotPassword.UPDATE_PASSWORD_ERROR_FIELD:
            return {
                ...state,
                password: {
                    ...state.password,
                    containErrors: action.payload.password.containErrors,
                }
            };
        case forgotPassword.UPDATE_VALID_REPLACE_PASSWPRD:
            return {
                ...state,
                replacePassword: {
                    ...state.replacePassword,
                    value: action.payload.replacePassword.value,
                }
            };

        case forgotPassword.UPDATE_REPLACE_PASSWORD_ERROR_FIELD:
            return {
                ...state,
                replacePassword: {
                    ...state.replacePassword,
                    containErrors: action.payload.replacePassword.containErrors,
                }
            };

        case forgotPassword.GET_FORGOT_PASSWORD_RESPONSE:
            localStorage.setItem("token", action.payload.response.token);
            return {
                ...state,
                userIsForgotPassword: {
                    ...state.userIsForgotPassword,
                    token: action.payload.response.token,
                    success: action.payload.response.isForgotPassword,
                    message: action.payload.response.message,
                    show: true,
                }
            };
        case forgotPassword.GET_FORGOT_CHANGE_PASSWORD_RESPONSE:
            // localStorage.setItem("token", action.payload.response.token);
            return {
                ...state,
                userIsChangePassword: {
                    ...state.userIsChangePassword,
                    token: action.payload.response.token,
                    success: action.payload.response.isChangePassword,
                    message: action.payload.response.message,
                    show: true,

                }
            };

        default:
            return state;
    }
};