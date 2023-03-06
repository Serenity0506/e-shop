import { combineReducers } from "@reduxjs/toolkit"
import { userReducer } from "./slices/userSlice"
import { filterReducer } from "./slices/filterSlice"
import { cartReducer } from "./slices/cartSlice"
import { favoritesReducer } from "./slices/favoritesSlice"
import { mutateProductReducer } from "./slices/mutateProductSlice"

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  filter: filterReducer,
  favorites: favoritesReducer,
  mutateProduct: mutateProductReducer,
})
