import "./App.css"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { AddProductPopup } from "./components/Popup/AddProductPopup"
import { EditProductPopup } from "./components/Popup/EditProductPopup"
import { ListOfUserAddProducts } from "./components/Popup/ListOfUserAddProducts"

function App() {
  const [isAddProductPopupOpen, setAddProductPopupOpen] = useState(false)
  const [isEditProductPopupOpen, setEditProductPopupOpen] = useState(false)
  const [isListOfUserAddProducts, setListOfUserAddProducts] = useState(false)

  const closeAllPopups = () => {
    setAddProductPopupOpen(false)
    setEditProductPopupOpen(false)
    setListOfUserAddProducts(false)
  }

  const handleAddProductPopup = () => {
    console.log(1)
  }

  const handleEditProductPopup = () => {
    console.log(1)
  }

  const handleProductDelete = () => {
    console.log(1)
  }

  return (
    <div>
      <Header />
      <Outlet
        onAddProductPopupOpen={() => setAddProductPopupOpen(true)}
        onEditProductPopupOpen={() => setEditProductPopupOpen(true)}
        onListOfUserAddProducts={() => setListOfUserAddProducts(true)}
        onCardDelete={handleProductDelete}
      />

      <AddProductPopup
        isOpen={isAddProductPopupOpen}
        onAddProductPopup={handleAddProductPopup}
        onClose={closeAllPopups}
      />
      <EditProductPopup
        isOpen={isEditProductPopupOpen}
        onEditProductPopup={handleEditProductPopup}
        onClose={closeAllPopups}
      />
      <ListOfUserAddProducts
        isOpen={isListOfUserAddProducts}
        onClose={closeAllPopups}
      />

      <Footer />
    </div>
  )
}

export { App }
