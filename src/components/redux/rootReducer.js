import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from './slices/userSlice';
import { filterReducer } from './slices/filterSlice';
import { cartReducer } from './slices/cartSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
})