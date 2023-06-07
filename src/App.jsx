import { useNavigate } from "react-router-dom";
import React from "react"
import "./App.css";
import { Card, Header } from "./CommonComponent";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App w-full">
      <Header />
      <div className="flex justify-center items-center w-full mt-20">
      <div className="bg-white rounded-md drop-shadow-2xl w-[90%]">
        <div className="text-black py-5 px-5 font-bold text-lg">All Projects</div>
        <div className="flex flex-wrap justify-center my-1 mx-4 ">
          <Card
            item={"XGame"}
            style={{ backgroundColor: "rgb(217, 251, 255)" }}
            handleClick={() => navigate("/xgame")}
          />
          <Card
            item={"Swipe4win"}
            style={{ backgroundColor: "rgb(255, 253, 195)" }}
            handleClick={() => navigate("/swipe4win")}
          />
          {/* <Card item ={"Christianity"} style={{ backgroundColor: 'orange' }} handleClick={()=>navigate("/christianity")}  /> */}
          <Card
            item={"Ibadat"}
            style={{ backgroundColor: "rgb(255, 225, 225)" }}
            handleClick={() => navigate("/ibadat")}
          />
          <Card
            item={"Education-Portal"}
            style={{ backgroundColor: "rgb(222, 246, 232)" }}
            handleClick={() => navigate("/educ")}
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
