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
import { Signup } from './components/Signup/Signup';
import { Signin } from './components/Signin/Signin';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: 'main',
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
        element: <Signup />
      },
      {
        path: 'signin',
        element: <Signin />
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
