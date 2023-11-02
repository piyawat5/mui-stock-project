import { STOCK_EDIT_FAILED, STOCK_EDIT_FETCHING, STOCK_EDIT_SUCCESS, server } from "../Constants";
import { Product } from "../components/types/stock.type";
import { httpClient } from "../utils/httpclient";

export const stockIdFetching = () => ({
    type: STOCK_EDIT_FETCHING,
})

export const stockIdSuccess = (payload: Product) => ({
    type: STOCK_EDIT_SUCCESS,
    payload
})
export const stockIdFail = () => ({
    type: STOCK_EDIT_FAILED,
})

export const putStock = (formData: Product, navigate: (path: string) => void) => {
    return async (dispatch: any) => {
        try {
            if (formData) {
                await httpClient.put(server.PRODUCT_URL, formData)
                navigate('/stock')
            }
        } catch (error) {
            dispatch(stockIdFail())
        }
    }
}

export const getById = (id: string) => {
    return async (dispatch: any) => {
        try {
            //fetching.. 
            dispatch(stockIdFetching())

            //Success
            const res = await httpClient.get<Product>(`${server.PRODUCT_URL}/${id}`)
            if (res) {
                dispatch(stockIdSuccess(res.data))
            } else {
                dispatch(stockIdFail())
            }
        } catch (error) {
            dispatch(stockIdFail())
        }
    }
}
