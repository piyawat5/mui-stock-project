import { LOGIN_FAILED, LOGIN_FETCHING, LOGIN_SUCCESS, LOGOUT, OK, TOKEN, server } from "../Constants"
import { Account } from "../components/types/account.type"
import { LoginResult } from "../components/types/authen.type"
import { httpClient } from "../utils/httpclient"

export const fetchingLogin = () => ({
    type: LOGIN_FETCHING,
})

export const successLogin = (payload: LoginResult) => ({
    type: LOGIN_SUCCESS,
    payload
})
export const failLogin = () => ({
    type: LOGIN_FAILED,
})
export const logout = () => ({
    type: LOGOUT,
})

export const authen = (action: 'LOGIN' | 'LOGOUT', navigate: (path: string) => void, payload?: Account,) => {
    return async (dispatch: any) => {
        if (action === 'LOGIN') {
            try {
                dispatch(fetchingLogin())

                const res = await httpClient.post<LoginResult>(server.LOGIN_URL, payload)

                if (res.data.result === 'ok') {
                    dispatch(successLogin(res.data))
                    localStorage.setItem(TOKEN, res.data.token as string)
                    alert('Login success')
                    navigate('/home')
                } else {
                    dispatch(failLogin())
                    alert('Incorrect username')
                }
            } catch (error) {
                dispatch(failLogin())
                alert('somethings went wrong')
            }
        } else {
            dispatch(logout())
            localStorage.removeItem(TOKEN)
            alert('Log out success')
            navigate('/login')
        }
    }
}

//restore state when web is refreshed  
export const restoreLogin = () => {
    return (dispatch: any) => {

        const token = localStorage.getItem(TOKEN)
        if (token) {

            dispatch(successLogin({ token, message: 'Login successfully', result: OK }))
        } else {
            dispatch(logout())
        }
    }
}