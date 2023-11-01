import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import authenReducer, { AuthenState } from "./authen.reducer"
import stockReducer, { StockState } from "./stock.reducer";
import stockIdReducer, { StockIdState } from "./stockId.reducer";

export default combineReducers({
    registerReducer,
    authenReducer,
    stockReducer,
    stockIdReducer,
})

export interface RootReducers {
    registerReducer: RegisterState;
    authenReducer: AuthenState;
    stockReducer: StockState;
    stockIdReducer: StockIdState
}
