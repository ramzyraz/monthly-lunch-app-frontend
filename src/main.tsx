import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ToVisit from './pages/ToVisit';
import ErrorPage from './pages/Error';
import CurrentPoll from './pages/CurrentPoll';
import NavbarWrapper from './components/Nav';
import AddRestaurantForm from './components/AddRestaurantForm';
import './styles.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      { 
        path: "tovisit",
        element: <ToVisit />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      { 
        path: "addvisit",
        element: <AddRestaurantForm />,
      },
      {
        path: "poll",
        element: <CurrentPoll />
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
