import React from "react";
import { Header,Card } from "../../CommonComponent";

function Swipe4win() {
  return (
    <div>
      <Header />
      <div>Swipe4Win</div>
      <div>
      <div className="flex justify-center my-10 mx-4">
        <Card item={"MtnZambia"} handleClick={() => navigate("/swipe4win/Zambia")} />
        <Card item={"MtnCongo"} handleClick={() => navigate("/swipe4win/Congo")} />
        <Card
          item={"MtnIc"}
          handleClick={() => navigate("/swipe4win/Ic")}
        />
        <Card item={"UnitelAngola"} handleClick={() => navigate("/christianity")} />
        <Card item={"VodacomTanzania"} handleClick={() => navigate("/educ")} />
      </div>
      <div className="flex justify-center my-10 mx-4">
        <Card item={"EntelPeru"} handleClick={() => navigate("/xgame")} />
        <Card item={"MtnBenin"} handleClick={() => navigate("/swipe4win")} />
        <Card
          item={"ZainLibyana"}
          handleClick={() => navigate("/christianity")}
        />
        <Card item={"AisThailand"} handleClick={() => navigate("/christianity")} />
        <Card item={"MtnSwailand"} handleClick={() => navigate("/educ")} />
      </div>
      </div>
    </div>
  );
}

export default Swipe4win;
