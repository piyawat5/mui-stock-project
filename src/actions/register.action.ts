import { REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS, server } from "../Constants"
import { Account } from "../components/types/account.type"
import { httpClient } from "../utils/httpclient"
import { AnyAction, Dispatch } from "redux"

export const setFetchingRegister = () => ({
    type: REGISTER_FETCHING,

})
export const setSuccessRegister = (res: any) => ({
    type: REGISTER_SUCCESS,
    payload: res,
})
export const setFailRegister = () => ({
    type: REGISTER_FAILED,

})


export function register(account: Account, navigate: (path: string) => void) {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            // is fetching
            dispatch(setFetchingRegister())

            // post
            let res = await httpClient.post(server.REGISTER_URL, account)
            if (res.data.result === 'ok') {
                dispatch(setSuccessRegister(res.data))
                alert('Register successfully')
                navigate('/login')
            } else {
                alert('Opps duplicate username')
                dispatch(setFailRegister())
            }
        } catch (error) {
            dispatch(setFailRegister())
            alert('Opps somethings went wrong')
        }
    }
}

