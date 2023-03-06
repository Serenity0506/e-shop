import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const favoritesSlice = createSlice({
  name: "favorites", //уникальное имя среза
  initialState: initState.favorites, //вытаскиваем
  reducers: {
    addFavorite(state, action) {
      const id = action.payload

      if (state.some((i) => i.id === id)) return

      state.push({
        _id: action.payload,
      })
    },
    removeFavorite(state, action) {
      return state.filter((product) => product._id !== action.payload)
    },
  },
})

export const getFavoritesSelector = (state) => state.favorites

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
