import { STOCK_AFTER_ACTIONS, STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS } from "../Constants";
import { Product } from "../components/types/stock.type";

/* eslint-disable import/no-anonymous-default-export */
export type StockState = {
    isFetching: boolean;
    isSuccess: boolean;
    isFail: boolean;
    isAfterActions: string;
    res: Product[];
}
const stockState = {

    isFetching: false,
    isSuccess: false,
    isFail: false,
    isAfterActions: '',
    res: [],
}


export default (state = stockState, { type, product, action }: any): StockState => {
    switch (type) {

        case STOCK_FETCHING:
            return { ...state, isAfterActions: '', isFetching: true, isSuccess: false, isFail: false, res: [] }
        case STOCK_SUCCESS:
            return { ...state, isAfterActions: '', isFetching: false, isSuccess: true, isFail: false, res: product }
        case STOCK_FAILED:
            return { ...state, isAfterActions: '', isFetching: false, isSuccess: false, isFail: true, res: [] }
        case STOCK_AFTER_ACTIONS:
            return { ...state, isAfterActions: action, isFetching: false, isSuccess: false, isFail: true, res: product }
        default:
            return state
    }
}
