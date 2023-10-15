/* eslint-disable import/no-anonymous-default-export */
export type SomeState = {
    someProp: string;
}

const initialState: SomeState = {
    someProp: 'test'
}

export default (state = initialState, { type, payload }: any): SomeState => {
    switch (type) {

        case 'first':
            return { ...state }

        default:
            return state
    }
}
