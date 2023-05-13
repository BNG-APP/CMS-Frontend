import { Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Menu";

function Header() {
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  const onHandleLogout = () => {
    navigate("/login");
    localStorage.setItem("login", false);
  };
  return (
    <div className="flex justify-between mt-2 mb-6">
      <Sidebar />
      <div className="text-3xl text-black font-bold mr-24" onClick={()=>navigate("/home")}>CMS Portal</div>
      {login && (
        <Button variant="contained" onClick={onHandleLogout}>
          LogOut
        </Button>
      )}
    </div>
  );
}

export default Header;
