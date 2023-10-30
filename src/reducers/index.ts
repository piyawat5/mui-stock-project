import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import authenReducer, { AuthenState } from "./authen.reducer"
import stockReducer, { StockState } from "./stock.reducer";

export default combineReducers({
    registerReducer: registerReducer,
    authenReducer: authenReducer,
    stockReducer
})

export interface RootReducers {
    registerReducer: RegisterState;
    authenReducer: AuthenState;
    stockReducer: StockState;
}
