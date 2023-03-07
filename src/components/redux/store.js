import { configureStore } from "@reduxjs/toolkit"
import {
  ESHOP_LS_KEY,
  ESHOP_CART_LS_KEY,
  ESHOP_FAVORITES_LS_KEY,
} from "./constants"
import { getInitState } from "./initState"
import { rootReducer } from "./rootReducer"
import { dogFoodApi } from "../Api/Api/DogFoodApi"
import { setCart } from "./slices/cartSlice"
import { setFavorites } from "./slices/favoritesSlice"

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getInitState(),
})

store.subscribe(() => {
  const currentState = store.getState() //вернули текущее состояние нашего стора
  window.localStorage.setItem(ESHOP_LS_KEY, JSON.stringify(currentState))
})

let userId
//решаем проблему отдельной корзины для нового пользователя
store.subscribe(() => {
  const currentState = store.getState()
  const cartsFromLS = window.localStorage.getItem(ESHOP_CART_LS_KEY)
  const parsedCartsFromLS = cartsFromLS ? JSON.parse(cartsFromLS) : {} //если карты есть, то парсим, если нет, то пустой объект

  const favoritesFromLS = window.localStorage.getItem(ESHOP_FAVORITES_LS_KEY)
  const parsedFavoritesFromLS = favoritesFromLS
    ? JSON.parse(favoritesFromLS)
    : {}

  if (currentState.user.id) {
    //если пользователь есть

    if (userId) {
      window.localStorage.setItem(
        ESHOP_CART_LS_KEY,
        JSON.stringify({
          ...parsedCartsFromLS, //разворачиваем корзину и перезаписываем для текущего пользователя
          [currentState.user.id]: currentState.cart,
        })
      )

      window.localStorage.setItem(
        ESHOP_FAVORITES_LS_KEY,
        JSON.stringify({
          ...parsedFavoritesFromLS, //разворачиваем корзину и перезаписываем для текущего пользователя
          [currentState.user.id]: currentState.favorites,
        })
      )
    } else {
      userId = currentState.user.id

      const currentUserSavedCart = parsedCartsFromLS[userId] || []
      const currentUserSavedFavorites = parsedFavoritesFromLS[userId] || []

      store.dispatch(setCart(currentUserSavedCart))
      store.dispatch(setFavorites(currentUserSavedFavorites))
    }
  } else {
    userId = null
  }
})

store.subscribe(() => {
  dogFoodApi.setToken(store.getState().user.token)
})
