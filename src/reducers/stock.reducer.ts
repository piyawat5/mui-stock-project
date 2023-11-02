import { STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS } from "../Constants";
import { Product } from "../components/types/stock.type";

/* eslint-disable import/no-anonymous-default-export */
export type StockState = {
    isFetching: boolean;
    isSuccess: boolean;
    isFail: boolean;
    res: Product[];
}
const stockState = {

    isFetching: false,
    isSuccess: false,
    isFail: false,
    res: [],
}


export default (state = stockState, { type, payload }: any): StockState => {
    switch (type) {

        case STOCK_FETCHING:
            return { ...state, isFetching: true, isSuccess: false, isFail: false, res: [] }
        case STOCK_SUCCESS:
            return { ...state, isFetching: false, isSuccess: true, isFail: false, res: payload }
        case STOCK_FAILED:
            return { ...state, isFetching: false, isSuccess: false, isFail: true, res: [] }
        default:
            return state
    }
}
