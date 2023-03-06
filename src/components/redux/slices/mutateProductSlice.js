import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const mutateProductSlice = createSlice({
  name: "mutateProduct", //уникальное имя среза
  initialState: initState.mutateProduct, //вытаскиваем
  reducers: {
    openAddNewProductPopup() {
      return {
        product: initState.mutateProduct.product,
        isOpen: true,
        isEdit: false,
      }
    },
    openEditProductPopup(_, action) {
      return {
        product: action.payload,
        isOpen: true,
        isEdit: true,
      }
    },
    closeProductPopup(state) {
      return {
        ...state,
        isOpen: false,
      }
    },
  },
})

export const getProductFromMutatePopupSelector = (state) =>
  state.mutateProduct.product

export const getMutatePopupStateSelector = (state) => ({
  isOpen: state.mutateProduct.isOpen,
  isEdit: state.mutateProduct.isEdit,
})

export const {
  openAddNewProductPopup,
  openEditProductPopup,
  closeProductPopup,
} = mutateProductSlice.actions
export const mutateProductReducer = mutateProductSlice.reducer
