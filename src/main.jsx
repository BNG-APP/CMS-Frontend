import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRouter.jsx';
import App from './App.jsx'
import { AddGame, Christianity, EducationPortal, GameTable, Ibadat, Login, Swipe4win } from './Component/index.jsx';
import {MtnIc,MtnZambia,MtnCongo, MtnBenin} from "./Component/Swipe4win"

import './index.css'
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <ProtectedRoute Component={App} />,
  },
  {
    path: "/xgame",
    element: <ProtectedRoute Component={GameTable} />,
  },
  {
    path: "/addgame",
    element: <ProtectedRoute Component={AddGame} />,
  },
  {
    path: "/swipe4win",
    element: <ProtectedRoute Component={Swipe4win} />,
  },
      {
        path: "/swipe4win/MtnZambia",
        element: <MtnZambia />,
      },
      {
        path: "/swipe4win/MtnIC",
        element: <MtnIc />,
      },
      {
        path: "/swipe4win/MtnCongo",
        element: <MtnCongo />,
      },
      {
        path: "MtnBenin",
        element: <MtnBenin />,
      },
   


  {
    path: "/christianity",
    element: <ProtectedRoute Component={Christianity} />,
  },
  {
    path: "/ibadat",
    element: <ProtectedRoute Component={Ibadat} />,
  },
  {
    path: "/educ",
    element: <ProtectedRoute Component={EducationPortal} />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
