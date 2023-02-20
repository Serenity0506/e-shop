import { ESHOP_LS_KEY } from './constants'

export const initState = {
    user: {
        group: '',
        email: '',
        token: '',
    },
    cart: [],
    filter: {
        search: '',
    },
}

export const getInitState = () => {
    const dataFromLS = window.localStorage.getItem(ESHOP_LS_KEY)

    return dataFromLS ? JSON.parse(dataFromLS) : initState
}

export const resetState = () =>
    window.localStorage.setItem(ESHOP_LS_KEY, null)