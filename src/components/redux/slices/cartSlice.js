import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const cartSlice = createSlice({
  name: "cart",
  initialState: initState.cart,
  reducers: {
    // loadCartFromLocalStorage(state, action) {
    //   const cartsFromLS = window.localStorage.getItem(ESHOP_CART_LS_KEY)
    //   const parsedCartsFromLS = cartsFromLS ? JSON.parse(cartsFromLS) : {} //если карты есть, то парсим, если нет, то пустой объект
    //   const currentUserSavedCart = parsedCartsFromLS[action.payload] || []

    //   return currentUserSavedCart
    // },

    addProduct(state, action) {
      const id = action.payload

      if (state.some((i) => i._id === id)) return

      state.push({
        _id: action.payload,
        count: 1,
        isChecked: false,
      })
    },

    removeProduct(state, action) {
      return state.filter((product) => product._id !== action.payload)
    },

    deleteProduct(state, action) {
      delete state[action.payload]
    },

    checkProduct(state, action) {
      return state.map((product) => {
        if (product._id === action.payload) {
          return {
            ...product,
            isChecked: true,
          }
        }
        return product
      })
    },

    uncheckProduct(state, action) {
      return state.map((product) => {
        if (product._id === action.payload) {
          return {
            ...product,
            isChecked: false,
          }
        }
        return product
      })
    },

    incrementCount(state, action) {
      state.map((product) => {
        if (product._id === action.payload) {
          return {
            ...product,
            count: product.count++,
          }
        }
        return product
      })
    },

    decrementCount(state, action) {
      state.map((product) => {
        if (product._id === action.payload) {
          return {
            ...product,
            count: product.count--,
          }
        }
        return product
      })
    },

    checkAllP(state, action) {
      state.map((product) => {
        product.isChecked = true
        return product
      })
    },

    uncheckAllP(state, action) {
      state.map((product) => {
        product.isChecked = false
        return product
      })
    },

    clearCart() {
      return []
    },

    setCart(state, action) {
      return action.payload
    },
  },
})

export const {
  addProduct,
  removeProduct,
  checkProduct,
  uncheckProduct,
  checkAllP,
  uncheckAllP,
  incrementCount,
  decrementCount,
  clearCart,
  setCart,
  // loadCartFromLocalStorage,
} = cartSlice.actions

export const getCartSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
