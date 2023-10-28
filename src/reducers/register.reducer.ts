import { REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS } from "../Constants";

/* eslint-disable import/no-anonymous-default-export */

export type RegisterState = {
    isFetching: boolean;
    isSuccess: boolean;
    isFail: boolean;
}

const registerState: RegisterState = {
    isFetching: false,
    isSuccess: false,
    isFail: false,
}

export default (state = registerState, { type, payload }: any): RegisterState => {
    switch (type) {

        case REGISTER_FETCHING:
            return { ...state, isFetching: true, isSuccess: false, isFail: false }
        case REGISTER_SUCCESS:
            return { ...state, isFetching: false, isSuccess: true, isFail: false }
        case REGISTER_FAILED:
            return { ...state, isFetching: false, isSuccess: false, isFail: true }

        default:
            return state
    }
}
