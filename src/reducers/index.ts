import { combineReducers } from "redux";
import someReducer, { SomeState } from "./someReducer";


export default combineReducers({
    someReducer: someReducer
})

export interface RootReducers {
    someReducer: SomeState;
}
