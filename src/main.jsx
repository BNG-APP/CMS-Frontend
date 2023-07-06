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
import AudioUpload from "./CommonComponent/AudioUpload.jsx";
import PdfUpload from "./CommonComponent/PdfUpload.jsx";
import VideoUpload from "./CommonComponent/VideoUpload.jsx";
import ImageUpload from "./CommonComponent/ImageUpload.jsx";
const rountes=[ 
{
  path: "/home",
  element: <ProtectedRoute Component={App} />,
  breadcrumb:"Home"
},
{
  path: "/xgame",
  element: <ProtectedRoute Component={GameTable} />,
  breadcrumb:"XGames"
},
{
  path: "/addgame",
  element: <ProtectedRoute Component={AddGame} />,
  breadcrumb:"Add Game",
  
},
{
  path: "/swipe4win",
  element: <ProtectedRoute Component={Swipe4win} />,
  breadcrumb:"Swipe4win"
},
{
  path: "/swipe4win/MtnZambia",
  element: <MtnZambia />,
  errorElement:<Error />
},
{
  path: "/swipe4win/EditDetails",
  element: <EditDetails />,
  breadcrumb:"Edit Details"
},

{
  path: "/swipe4win/SingleQuestion",
  element: <SingleQuestion />,
  breadcrumb:"Upload Singal Question "
},
{
  path: "/swipe4win/MultiQuestion",
  element: <MultiQuestion />,
  breadcrumb:"Upload MultiQuestions"

},
{
  path: "/swipe4win/ViewEntity",
  element: <VeiwEntity />,
  breadcrumb:"View Entity"
},
{
  path: "/swipe4win/edit/:id",
  element: <EditEntity />,
  breadcrumb:"Edit Entity"
},
{
  path: "/swipe4win/ViewResult",
  Component: <ViewResult />,
  breadcrumb:"View Results"
},
{
  path: "/christianity",
  Component: <ProtectedRoute Component={Christianity} />,
  breadcrumb:"Christianity"
},
{
  path: "/ibadat",
  Component: <ProtectedRoute Component={Ibadat} />,
  breadcrumb:"IBadat"
},
{
  path: "/education",
  Component: <ProtectedRoute Component={EducationPortal} />,
  breadcrumb:"Education Portal"
},
]
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
    path: "/audio",
    element: <ProtectedRoute Component={AudioUpload} />,
    breadcrumb:"Audio",
    errorElement:<Error />
  },
  {
    path: "/video",
    element: <ProtectedRoute Component={VideoUpload} />,
    breadcrumb:"Video",
    errorElement:<Error />
  },
  {
    path: "/image",
    element: <ProtectedRoute Component={ImageUpload} />,
    breadcrumb:"Image",
    errorElement:<Error />
  },
  {
    path: "/pdf",
    element: <ProtectedRoute Component={PdfUpload} />,
    breadcrumb:"Pdf",
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
    path: "/education",
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
export const generateBreadcrumbs = (pathname) => {
  const breadcrumbs = [{ path: '/', breadcrumb: 'Home' }];
  const pathSnippets = pathname.split('/').filter((x) => x);

  pathSnippets.forEach((_, index) => {
    const path = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const route = rountes?.find((r) => r.path === path);

    if (route) {
      breadcrumbs.push(route);
    }
  });

  return breadcrumbs;
};