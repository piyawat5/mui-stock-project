import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import token, { Token } from "./token.reducer"

export default combineReducers({
    registerReducer: registerReducer,
    token: token
})

export interface RootReducers {
    registerReducer: RegisterState;
    token: Token
}
