/* eslint-disable import/no-anonymous-default-export */

import { LOGIN_FAILED, LOGIN_FETCHING, LOGIN_SUCCESS, LOGOUT, } from "../Constants";

export type TokenState = {
    isFetching: boolean;
    isSuccess: boolean;
    isFail: boolean;
    res: any;
}

const loginState: TokenState = {
    isFetching: false,
    isFail: false,
    isSuccess: false,
    res: null,
}

export default (state = loginState, { type, payload }: any) => {
    switch (type) {
        case LOGIN_FETCHING:
            return { ...state, res: null, isFetching: true, isFail: false, isSuccess: false }
        case LOGIN_SUCCESS:
            return { ...state, res: payload, isFetching: false, isFail: false, isSuccess: true }

        case LOGIN_FAILED:
            return { ...state, res: null, isFetching: false, isFail: true, isSuccess: false }
        case LOGOUT:
            return { ...state, res: null, isFetching: false, isFail: false, isSuccess: true }

        default:
            return state
    }
}
