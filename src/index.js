import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ContactsPage } from './components/ContactsPage/ContactPages';
import { Products } from './components/Products/Products';
import { Sales } from './components/Sales/Sales';
import { Payment } from './components/Payment/Payment';
import { Main } from './components/Main/Main';
import { SignIn } from './components/Sign/SignIn/SignIn';
import { SignUp } from './components/Sign/SignUp/SignUp';
import { AppContextProvider } from './Context/AppContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Cart } from './components/Cart/Cart';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        // path: 'main',
        element: <Main />,
      },

      {
        path: 'contacts',
        element: <ContactsPage />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'sales',
        element: <Sales />
      },
      {
        path: 'payment',
        element: <Payment />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'cart',
        element: <Cart />
      }
    ]
  }
])

const queryClient = new QueryClient(
) //хранилище данных с сетевыми запросами

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>
);
