import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRouter.jsx";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {store} from "./redux/store";

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
  EditEntity,
  MtnZambia,
} from "./Component/Swipe4win";
import MultiQuestion from "./Component/Swipe4win/MultiQuestion.jsx";
import EditDetails from "./Component/Swipe4win/EditDetails.jsx";
import SingleQuestion from "./Component/Swipe4win/SingleQuestion.jsx";
import VeiwEntity from "./Component/Swipe4win/VeiwEntity.jsx";
import ViewResult from "./Component/Swipe4win/ViewResult.jsx";

import "./index.css";
import Error from "./CommonComponent/Error.jsx";
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
    errorElement:<Error />
  },
  {
    path: "/xgame",
    element: <ProtectedRoute Component={GameTable} />,
    errorElement:<Error />
  },
  {
    path: "/addgame",
    element: <ProtectedRoute Component={AddGame} />,
    errorElement:<Error />
  },
  {
    path: "/swipe4win",
    element: <ProtectedRoute Component={Swipe4win} />,
    errorElement:<Error />
  },
  {
    path: "/swipe4win/MtnZambia",
    element: <MtnZambia />,
    errorElement:<Error />
  },
  {
    path: "/swipe4win/EditDetails",
    element: <EditDetails />,
    errorElement:<Error />
  },
  
  {
    path: "/swipe4win/SingleQuestion",
    element: <SingleQuestion />,
    errorElement:<Error />
  },
  {
    path: "/swipe4win/MultiQuestion",
    element: <MultiQuestion />,
    errorElement:<Error />

  },
  {
    path: "/swipe4win/ViewEntity",
    element: <VeiwEntity />,
    errorElement:<Error />
  },
  {
    path: "/swipe4win/edit/:id",
    element: <EditEntity />,
    errorElement:<Error />
  },
  {
    path: "/swipe4win/ViewResult",
    element: <ViewResult />,
    errorElement:<Error />
  },
  {
    path: "/christianity",
    element: <ProtectedRoute Component={Christianity} />,
    errorElement:<Error />
  },
  {
    path: "/ibadat",
    element: <ProtectedRoute Component={Ibadat} />,
    errorElement:<Error />
  },
  {
    path: "/educ",
    element: <ProtectedRoute Component={EducationPortal} />,
    errorElement:<Error />
  },
 { path: "/error",
  element: <ProtectedRoute Component={Error} />,
  errorElement:<Error />
},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
