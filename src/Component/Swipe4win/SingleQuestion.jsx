import { Button, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../CommonComponent";

function SingleQuestion() {
 

  console.log(location.state);
  return (
    <div>
      <Header />
      <div className="flex w-full">
        Hello
      </div>
    </div>
  );
}

export default SingleQuestion;
