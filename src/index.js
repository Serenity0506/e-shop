import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ContactsPage } from "./components/ContactsPage/ContactPages"
import { Products } from "./components/Products/Products"
import { Sales } from "./components/Sales/Sales"
import { Payment } from "./components/Payment/Payment"
import { Main } from "./components/Main/Main"
import { SignIn } from "./components/Sign/SignIn/SignIn"
import { SignUp } from "./components/Sign/SignUp/SignUp"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Cart } from "./components/Cart/Cart"
import { store } from "./components/redux/store"
import { Provider } from "react-redux"
import { ProductDetails } from "./components/ProductDetails/ProductDetails"
import { User } from "./components/User/User"
import { Favorites } from "./components/Favorites/Favorites"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        // path: 'main',
        element: <Main />,
      },

      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}) //хранилище данных с сетевыми запросами

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
