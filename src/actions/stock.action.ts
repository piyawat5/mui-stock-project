import { STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS, server } from "../Constants"
import { httpClient } from "../utils/httpclient"

export const stockFetching = () => ({
    type: STOCK_FETCHING,
})


export const stockSuccess = (payload: any) => ({
    type: STOCK_SUCCESS,
    payload
})
export const stockFail = () => ({
    type: STOCK_FAILED,

})

export const getStock = () => {
    return async (dispatch: any) => {
        try {
            //fetching...
            dispatch(stockFetching())

            //success
            const res = await httpClient.get(server.PRODUCT_URL)
            setTimeout(() => {
                dispatch(stockSuccess(res.data))
            }, 1000);
        } catch (error) {
            dispatch(stockFail)
        }
    }
}

