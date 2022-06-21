import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import browserHistory from "./browserHistory";
import { registerReducer } from './reducers/register'
import { loginReducer } from './reducers/login'
import { forgotPasswordReducer } from "./reducers/forgotPassword";
import { dashboardReducer } from "./reducers/dashboard";

export const rootReducer = combineReducers({
    router: connectRouter(browserHistory),
    dashboard: dashboardReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,

});