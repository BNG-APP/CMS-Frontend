import { useNavigate } from "react-router-dom";
import React from "react"
import "./App.css";
import { Card, Header } from "./CommonComponent";
import { useSelector } from "react-redux";
import Breadcrumbs from "./CommonComponent/Breadcrumbs";
function App() {
  const navigate = useNavigate();
  const sideMenu=useSelector(store=>store.app.isSideMenuOpen)
  return (
    <div className="App w-full">
      <Header />
     
      <div className="flex justify-center items-center w-full mt-20">
      <div className={`bg-white rounded-md drop-shadow-2xl w-[90%] ${sideMenu?'ml-[240px] w-[80%]':''}`}>
        <div className="text-black py-5 px-5 font-bold text-lg">Uploads</div>
        <div className="flex flex-wrap justify-center my-1 mx-4 ">
          <Card
            item={"Image"}
            style={{ backgroundColor: "rgb(217, 251, 255)" }}
            handleClick={() => navigate("/image")}
          />
          <Card
            item={"Audio"}
            style={{ backgroundColor: "rgb(255, 253, 195)" }}
            handleClick={() => navigate("/audio")}
          />
          <Card
            item={"Video"}
            style={{ backgroundColor: "rgb(255, 225, 225)" }}
            handleClick={() => navigate("/video")}
          />
          <Card
            item={"Pdfs"}
            style={{ backgroundColor: "rgb(222, 246, 232)" }}
            handleClick={() => navigate("/pdf")}
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
