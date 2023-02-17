import { configureStore } from "@reduxjs/toolkit";
import { ESHOP_LS_KEY, ESHOP_CARD_LS_KEY } from "./constants";
import { getInitState } from "./initState";
import { rootReducer } from "./rootReducer";


export const store = configureStore({
    reducer: rootReducer,
    preloadedState: getInitState()
})

store.subscribe(() => {
    const currentState = store.getState();
    window.localStorage.setItem(ESHOP_LS_KEY, JSON.stringify(currentState));
})

//решаем проблему отдельной корзины для нового пользователя
store.subscribe(() => {
    const cartsFromLS = window.localStorage.getItem(ESHOP_CARD_LS_KEY)
    const currentState = store.getState()

    const parsedCartsFromLS = cartsFromLS ? JSON.parse(cartsFromLS) : {} //если карты есть, то парсим, если нет, то пустой объект

    if (currentState.user.id) { //если пользователь есть
        window.localStorage.setItem(ESHOP_CARD_LS_KEY, JSON.stringify({
            ...parsedCartsFromLS, //разворачиваем корзину и перезаписываем для текущего пользователя
            [currentState.user.id]: currentState.cart,
        }))
    }
})
