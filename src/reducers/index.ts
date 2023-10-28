import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import tokenReducer, { TokenState } from "./token.reducer"

export default combineReducers({
    registerReducer: registerReducer,
    tokenReducer: tokenReducer
})

export interface RootReducers {
    registerReducer: RegisterState;
    tokenReducer: TokenState
}
