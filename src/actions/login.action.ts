import { server } from "../Constants"
import { httpClient } from "../utils/httpclient"

export const fetchingLogin = () => ({
    type: '',
})

export const successLogin = (payload: any) => ({
    type: '',
    payload
})
export const failLogin = () => ({
    type: '',
})
export const logout = () => ({
    type: '',

})

export const login = () => {
    return async (dispatch: any) => {
        try {
            dispatch(fetchingLogin())

            const res = await httpClient.post(server.LOGIN_URL)
            if (res.data.result === 'ok') {
                dispatch(successLogin(res))
                alert('Login success')
            } else {
                dispatch(failLogin())
                alert('Login fail')
            }
        } catch (error) {
            dispatch(failLogin())
            alert('somethings went wrong')
        }
    }
}