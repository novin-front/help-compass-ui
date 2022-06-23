import {
    register
} from '../actionTypes';
export const registerState = {
    feaching: false,
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
    userType: {
        value: "",
        containErrors: false,
    },
    userIsRegister: {
        token: "",
        isRegister: false,
        show: false,
        message: ""
    },
}
export const registerReducer = (state = registerState, action) => {
    switch (action.type) {
        case register.UPDATE_FEACHING:
            return {
                ...state,
                feaching: action.payload.feaching,
            };
        case register.UPDATE_VALID_EMAIL_VALUE:
            return {
                ...state,
                email: {
                    ...state.email,
                    value: action.payload.email.value,
                }
            };

        case register.UPDATE_EMAIL_ERROR_FIELD:
            return {
                ...state,
                email: {
                    ...state.email,
                    containErrors: action.payload.email.containErrors,
                }
            };

        case register.UPDATE_VALID_PASSWPRD:
            return {
                ...state,
                password: {
                    ...state.password,
                    value: action.payload.passwrod.value,
                }
            };

        case register.UPDATE_PASSWORD_ERROR_FIELD:
            return {
                ...state,
                password: {
                    ...state.password,
                    containErrors: action.payload.password.containErrors,
                }
            };
        case register.UPDATE_VALID_REPLACE_PASSWPRD:
            return {
                ...state,
                replacePassword: {
                    ...state.replacePassword,
                    value: action.payload.replacePassword.value,
                }
            };

        case register.UPDATE_REPLACE_PASSWORD_ERROR_FIELD:
            return {
                ...state,
                replacePassword: {
                    ...state.replacePassword,
                    containErrors: action.payload.replacePassword.containErrors,
                }
            };

        case register.UPDATE_VALID_USER_TYPE:
            return {
                ...state,
                userType: {
                    ...state.userType,
                    value: action.payload.userType.value,
                }
            };

        case register.UPDATE_USER_TYPE_ERROR_FIELD:
            return {
                ...state,
                userType: {
                    ...state.userType,
                    containErrors: action.payload.userType.containErrors,
                }
            };

        case register.GET_REGISTER_RESPONSE:
            // localStorage.setItem("token", action.payload.response.token);
            return {
                ...state,
                userIsRegister: {
                    ...state.userIsRegister,
                    token: action.payload.response.token,
                    isRegister: action.payload.response.isRegister,
                    message: action.payload.response.message,
                    show: true,

                }
            };

        default:
            return state;
    }
};