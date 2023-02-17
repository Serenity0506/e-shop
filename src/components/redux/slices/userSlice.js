import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const userSlice = createSlice({
    name: 'user', //уникальное имя среза
    initialState: initState.user,
    //ниже действия, которые происходят внутри среза
    reducers: {
        addNewUser: {
            reducer(state, action) {
                if (state.email !== action.payload.email) return action.payload
            },
            prepare(id, token, email) {
                return {
                    payload: {
                        id, token, email,
                    },
                }
            },
        },

        logOut() {
            return initState.user
        },
    },
})

//данные ниже (селекторы) оносятся к этому срезу,
//исп. в других местах, поэтому экспорт
export const getUserSelector = (state) => state.user
export const getTokenSelector = (state) => state.user.token

export const { addNewUser, logOut } = userSlice.actions
export const userReducer = userSlice.reducer
//payload - это объект новый, который создается
//в момент вызова этой фции через диспатч