import { REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS } from "../Constants";

/* eslint-disable import/no-anonymous-default-export */

export type RegisterState = {
    fetch: boolean;
    success: boolean;
    fail: boolean;
}

const registerState: RegisterState = {
    fetch: false,
    success: false,
    fail: false,
}

export default (state = registerState, { type, payload }: any): RegisterState => {
    switch (type) {

        case REGISTER_FETCHING:
            return { fetch: true, success: false, fail: false }
        case REGISTER_SUCCESS:
            return { fetch: false, success: true, fail: false }
        case REGISTER_FAILED:
            return { fetch: false, success: false, fail: true }
        default:
            return state
    }
}
