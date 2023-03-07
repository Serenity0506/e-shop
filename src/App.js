import "./App.css"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { AddProductPopup } from "./components/Popup/AddProductPopup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { dogFoodApi } from "./components/Api/Api/DogFoodApi"
import { useSelector } from "react-redux"
import { getMutatePopupStateSelector } from "./components/redux/slices/mutateProductSlice"

function App() {
  const [isAddProductPopupOpen, setAddProductPopupOpen] = useState(false)

  const queryClient = useQueryClient()
  const popupState = useSelector(getMutatePopupStateSelector)

  const { mutate: addProductMutation } = useMutation({
    mutationFn: (product) => dogFoodApi.addProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsfetch"] })
    },
  })

  const editProduct = useMutation({
    mutationFn: (product) => dogFoodApi.editProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsfetch"] })
      queryClient.invalidateQueries({ queryKey: ["productfetch"] })
    },
  })

  const handleProductMutate = (product) => {
    if (popupState.isEdit) {
      editProduct.mutate(product)
    } else {
      addProductMutation(product)
    }
  }

  return (
    <div>
      <Header />
      <Outlet />

      <AddProductPopup
        isOpen={isAddProductPopupOpen}
        setIsOpen={setAddProductPopupOpen}
        onProductMutate={handleProductMutate}
      />

      <Footer />
    </div>
  )
}

export { App }
