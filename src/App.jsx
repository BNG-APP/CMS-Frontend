import { useNavigate } from "react-router-dom";
import "./App.css";
import { Card,Header } from "./CommonComponent";

function App() {
  const navigate=useNavigate()
  return (
    <div className="App p-4 ">
      <Header />
      <div className="flex justify-center my-10 mx-4">
      <Card item={"XGame"} handleClick={()=>navigate("/xgame")} />
      <Card item={"Swipe4win"} handleClick={()=>navigate("/swipe4win")}  />
      <Card item ={"Christianity"} handleClick={()=>navigate("/christianity")}  />
      <Card item ={"Ibadat"} handleClick={()=>navigate("/christianity")}  />
      <Card item ={"Education-Portal"} handleClick={()=>navigate("/educ")}  />
      </div>
     
    </div>
  );
}

export default App;
