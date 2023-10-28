/* eslint-disable import/no-anonymous-default-export */

import { LOGIN_FAILED, LOGIN_FETCHING, LOGIN_SUCCESS, LOGOUT } from "../Constants";

export type LoginState = {
    fetch: boolean;
    success: boolean;
    fail: boolean;
}

const loginState: LoginState = {
    fetch: false,
    fail: false,
    success: false,
}

export default (state = loginState, { type, payload }: any) => {
    switch (type) {
        case LOGIN_FETCHING:
            return { fetch: true, fail: false, success: false }
        case LOGIN_SUCCESS:
            return { fetch: false, fail: false, success: true }

        case LOGIN_FAILED:
            return { fetch: false, fail: true, success: false }

        //    case LOGOUT:
        //         return { fetch:false , fail:false ,  success: }

        case '':
            return { ...state, ...payload }

        default:
            return state
    }
}
