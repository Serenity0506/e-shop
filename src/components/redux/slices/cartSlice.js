import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";


const cartSlice = createSlice({
    name: 'cart',
    initialState: initState.cart,
    reducers: {
        addCardProduct(state, action) {
            state.push({
                id: action.payload,
                count: 1,
                isCheked: false,
            });
        },

        removeCardProduct(state, action) {
            return state.filter((product) => product.id !== action.payload);
        },

        deleteCardProduct(state, action) {
            delete state[action.payload]
        },

        setCheckProduct(state, action) {
            return state.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        isChecked: true,
                    };
                }
                return product;
            });
        },


        setUnCheckProduct(state, action) {
            return state.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        isChecked: false,
                    };
                }
                return product;
            });
        },

        checkAllProducts(state, action) {
            action.payload.forEach((id) => {
                state[id].isChecked = true
            })
        },

        unCheckAllProducts(state, action) {
            action.payload.forEach((id) => {
                state[id].isChecked = false
            })
        },

        clearCart() {
            return []
        },
    }
})


export const {
    addCardProduct,
    removeCardProduct,
    deleteCardProduct,
    setCheckProduct,
    setUnCheckProduct,
    checkAllProducts,
    unCheckAllProducts,
    clearCart
} = cartSlice.actions;

export const getCartSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer



// deleteCheckedFromCart(state, action) {
//     action.payload.forEach((id) => {
//       delete state[id]
//     })