import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import authenReducer, { AuthenState } from "./authen.reducer"

export default combineReducers({
    registerReducer: registerReducer,
    authenReducer: authenReducer
})

export interface RootReducers {
    registerReducer: RegisterState;
    authenReducer: AuthenState
}
