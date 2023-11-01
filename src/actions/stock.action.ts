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

export const getStock = (keyword?: string) => {
    return async (dispatch: any) => {
        try {
            //fetching...
            dispatch(stockFetching())

            //success
            const res = await httpClient.get(server.PRODUCT_URL)
            if (keyword) {
                const filter = res.data.filter((item: any) => {
                    const filterName = item.name.toLowerCase().includes(keyword.toLowerCase())
                    const filterId = item.id.toString().includes(keyword.toString())
                    const filterPrice = item.price.toString().includes(keyword.toString())
                    const filterStock = item.stock.toString().includes(keyword.toString())
                    if (filterId || filterPrice || filterStock || filterName) {
                        return true;
                    }
                    return false;
                })
                dispatch(stockSuccess(filter))
            } else {

                setTimeout(() => {
                    dispatch(stockSuccess(res.data))
                }, 500);
            }
        } catch (error) {
            dispatch(stockFail)
        }
    }
}
