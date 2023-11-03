import { STOCK_AFTER_ACTIONS, STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS, server } from "../Constants"
import { Product } from "../components/types/stock.type"
import { httpClient } from "../utils/httpclient"

export const stockFetching = () => ({
    type: STOCK_FETCHING,
})


export const stockSuccess = (product: Product[]) => ({
    type: STOCK_SUCCESS,
    product
})
export const stockFail = () => ({
    type: STOCK_FAILED,

})
export const stockAfterActions = (product: Product[], action: string) => {
    return { type: STOCK_AFTER_ACTIONS, product, action }
}

export const getStock = (keyword?: string) => {
    return async (dispatch: any) => {
        try {
            //fetching...
            dispatch(stockFetching())

            //success
            const res = await httpClient.get<Product[]>(server.PRODUCT_URL)
            if (keyword) {
                const filter = res.data.filter((item: Product) => {
                    const filterName = item.name.toLowerCase().includes(keyword.toLowerCase())
                    const filterId = item.id?.toString().includes(keyword.toString())
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
            dispatch(stockFail())
        }
    }
}

export const postStock = (formData: FormData, navigate: (path: string) => void) => {
    return async (dispatch: any) => {
        try {
            //fetching.. 
            dispatch(stockFetching())

            //Success
            if (formData) {
                await httpClient.post(server.PRODUCT_URL, formData)
                navigate('/stock')
            }
        } catch (error) {
            dispatch(stockFail())
        }
    }
}


export const deleteStock = (id?: number,) => {
    return async (dispatch: any) => {
        try {
            //fetching.. 
            dispatch(stockFetching())

            //Success
            await httpClient.delete(`${server.PRODUCT_URL}/${id}`)
            const res = await httpClient.get(server.PRODUCT_URL)
            dispatch(stockAfterActions(res.data, 'DELETE'))
            setTimeout(() => {
                dispatch(stockSuccess(res.data,))
            }, 2000);
        } catch (error) {
            dispatch(stockFail())
        }
    }
}