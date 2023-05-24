import { useNavigate } from "react-router-dom";
import "./App.css";
import { Card,Header } from "./CommonComponent";

function App() {
  const navigate=useNavigate()
  return (
    <div className="App p-4 ">
      <Header />
      <div className="flex flex-wrap justify-center my-10 mx-4">
      <Card item={"XGame"} style={{ backgroundColor: 'red' }} handleClick={()=>navigate("/xgame")} />
      <Card item={"Swipe4win"} style={{ backgroundColor: 'green' }} handleClick={()=>navigate("/swipe4win")}  />
      <Card item ={"Christianity"} style={{ backgroundColor: 'orange' }} handleClick={()=>navigate("/christianity")}  />
      <Card item ={"Ibadat"} style={{ backgroundColor: 'purple' }} handleClick={()=>navigate("/ibadat")}  />
      <Card item ={"Education-Portal"} style={{ backgroundColor: 'yellow' }} handleClick={()=>navigate("/educ")}  />
      </div>
     
    </div>
  );
}

export default App;
