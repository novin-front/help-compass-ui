import { login } from '../actionTypes';
export const loginState = {
    feaching: false,
    email: {
        value: "",
        containErrors: false,
    },
    password: {
        value: "",
        containErrors: false,
    },
    userIsLogin: {
        token: "",
        isLogin: false,
        show: false,
        message: "",
        profileStatus: "",
        activated: "",
        role: "",
    },
}
export const loginReducer = (state = loginState, action) => {
    switch (action.type) {
        case login.UPDATE_FEACHING:
            return {
                ...state,
                feaching: action.payload.feaching,
            };
        case login.UPDATE_VALID_EMAIL_VALUE:
            return {
                ...state,
                email: {
                    ...state.email,
                    value: action.payload.email.value,
                }
            };

        case login.UPDATE_EMAIL_ERROR_FIELD:
            return {
                ...state,
                email: {
                    ...state.email,
                    containErrors: action.payload.email.containErrors,
                }
            };

        case login.UPDATE_VALID_PASSWPRD:
            return {
                ...state,
                password: {
                    ...state.password,
                    value: action.payload.passwrod.value,
                }
            };
            break;

        case login.UPDATE_PASSWORD_ERROR_FIELD:
            return {
                ...state,
                password: {
                    ...state.password,
                    containErrors: action.payload.password.containErrors,
                }
            };

        case login.GET_LOGIN_RESPONSE:
            localStorage.setItem("token", action.payload.response.token);
            return {
                ...state,
                userIsLogin: {
                    ...state.userIsLogin,
                    token: action.payload.response.token,
                    isLogin: action.payload.response.isLogin,
                    message: action.payload.response.message,
                    show: true,
                    profileStatus: action.payload.response.profileStatus,
                    activated: action.payload.response.activated,
                    role: action.payload.response.role
                }
            };

        default:
            return state;
    }
};