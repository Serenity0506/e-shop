import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";


const cartSlice = createSlice({
    name: 'cart',
    initialState: initState.cart,
    reducers: {
        addProduct(state, action) {
            const id = action.payload;

            if (state.some(i => i.id === id)) return;

            state.push({
                id: action.payload,
                count: 1,
                isChecked: false,
            });
        },

        removeProduct(state, action) {
            return state.filter((product) => product.id !== action.payload);
        },

        deleteProduct(state, action) {
            delete state[action.payload]
        },

        checkProduct(state, action) {
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


        uncheckProduct(state, action) {
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

        incrementCount(state, action) {
            state.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        count: product.count++,
                    };
                }
                return product;
            })
        },

        decrementCount(state, action) {
            state.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        count: product.count--,
                    };
                }
                return product;
            })
        },

        checkAllProducts(state, action) {
            action.payload.forEach((id) => {
                state[id].isChecked = true
            })
        },

        uncheckAllProducts(state, action) {
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
    addProduct,
    removeProduct,
    checkProduct,
    uncheckProduct,
    checkAllProducts,
    uncheckAllProducts,
    incrementCount,
    decrementCount,
    clearCart
} = cartSlice.actions;

export const getCartSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer



// deleteCheckedFromCart(state, action) {
//     action.payload.forEach((id) => {
//       delete state[id]
//     })