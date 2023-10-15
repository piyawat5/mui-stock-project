import { TEST } from "../const";

export const setFirst = () => ({
    type: TEST,

})

export function first() {
    return (dispatch: any) => {
        dispatch(setFirst())
    }
}



