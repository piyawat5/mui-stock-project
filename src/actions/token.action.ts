import { LOGIN_FAILED, LOGIN_FETCHING, LOGIN_SUCCESS, LOGOUT, server } from "../Constants"
import { Account } from "../components/types/account.type"
import { httpClient } from "../utils/httpclient"

export const fetchingLogin = () => ({
    type: LOGIN_FETCHING,
})

export const successLogin = (payload: any) => ({
    type: LOGIN_SUCCESS,
    payload
})
export const failLogin = () => ({
    type: LOGIN_FAILED,
})
export const logout = () => ({
    type: LOGOUT,
})

export const token = (action: 'LOGIN' | 'LOGOUT', navigate: (path: string) => void, payload?: Account,) => {
    return async (dispatch: any) => {
        if (action === 'LOGIN') {
            try {
                dispatch(fetchingLogin())

                const res = await httpClient.post(server.LOGIN_URL, payload)

                if (res.data.result === 'ok') {
                    dispatch(successLogin(res))
                    alert('Login success')
                    navigate('/stock')
                } else {
                    dispatch(failLogin())
                    alert('Login fail')
                }
            } catch (error) {
                dispatch(failLogin())
                alert('somethings went wrong')
            }
        } else {
            dispatch(logout())
            alert('Log out success')
            navigate('/login')
        }
    }
}