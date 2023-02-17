import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from './slices/userSlice';
import { filterSlice } from './slices/filterSlice';
import { cartSlice } from './slices/cartSlice';

export const rootReducer = combineReducers({
    user: userSlice,
    card: cartSlice,
    filter: filterSlice,
})