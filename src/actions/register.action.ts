import { REGISTER_FETCHING, server } from "../Constants"
import { Account } from "../components/types/account.type"
import { httpClient } from "../utils/httpclient"

export const setFetchingRegister = () => ({
    type: REGISTER_FETCHING,

})
export const setSuccessRegister = (res: any) => ({
    type: REGISTER_FETCHING,
    payload: res,
})
export const setFailRegister = () => ({
    type: REGISTER_FETCHING,

})


export function register(account: Account) {
    return async (dispatch: any) => {
        try {
            dispatch(setFetchingRegister())
            let res = await httpClient.post(server.REGISTER_URL, account)
            if (res.data.result === 'ok') {
                dispatch(setSuccessRegister(res))
            }
        } catch (error) {
            dispatch(setFailRegister())
        }
    }
}

