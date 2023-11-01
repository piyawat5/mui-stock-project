import { STOCK_EDIT_FAILED, STOCK_EDIT_FETCHING, STOCK_EDIT_SUCCESS } from "../Constants";
import { FormData } from "../components/types/stock.type";

/* eslint-disable import/no-anonymous-default-export */
export type StockIdState = {
    isFetching: boolean;
    isSuccess: boolean;
    isFail: boolean;
    res: FormData | null;
}

const stockIdState = {
    isFetching: false,
    isSuccess: false,
    isFail: false,
    res: null,
}

export default (state = stockIdState, { type, payload }: any): StockIdState => {
    switch (type) {

        case STOCK_EDIT_FETCHING:
            return { ...state, isFetching: true, isSuccess: false, isFail: false, res: null }
        case STOCK_EDIT_SUCCESS:
            return { ...state, isFetching: false, isSuccess: true, isFail: false, res: payload }
        case STOCK_EDIT_FAILED:
            return { ...state, isFetching: false, isSuccess: false, isFail: true, res: null }
        default:

            return state
    }
}
