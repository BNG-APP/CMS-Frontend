import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter.jsx";
import App from "./App.jsx";
import {
  AddGame,
  Christianity,
  EducationPortal,
  GameTable,
  Ibadat,
  Login,
  Swipe4win,
} from "./Component/index.jsx";
import {
  MtnIc,
  MtnZambia,
  MtnCongo,
  MtnBenin,
  EntelPeru,
  AisThailand,
  MtnSwaziland,
  UnitelAngola,
  ZainLibyana,
} from "./Component/Swipe4win";
import MultiQuestion from "./Component/Swipe4win/MultiQuestion.jsx";
import SingleQuestion from "./Component/Swipe4win/SingleQuestion.jsx";
import VeiwEntity from "./Component/Swipe4win/VeiwEntity.jsx";
import ViewResult from "./Component/Swipe4win/ViewResult.jsx";

import "./index.css";
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
    path: "/swipe4win/MtnBenin",
    element: <MtnBenin />,
  },
  {
    path: "/swipe4win/EntelPeru",
    element: <EntelPeru />,
  },
  {
    path: "/swipe4win/AisThailand",
    element: <AisThailand />,
  },

  {
    path: "/swipe4win/MtnSwaziland",
    element: <MtnSwaziland />,
  },
  {
    path: "/swipe4win/UnitelAngola",
    element: <UnitelAngola />,
  },
  {
    path: "/swipe4win/ZainLibyana",
    element: <ZainLibyana />,
  },
  {
    path: "/swipe4win/SingleQuestion",
    element: <SingleQuestion />,
  },
  {
    path: "/swipe4win/MultiQuestion",
    element: <MultiQuestion />,
  },
  {
    path: "/swipe4win/ViewEntity",
    element: <VeiwEntity />,
  },
  {
    path: "/swipe4win/ViewResult",
    element: <ViewResult />,
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
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
