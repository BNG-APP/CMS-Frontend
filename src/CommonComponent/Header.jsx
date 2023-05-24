import { Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Utilities/ImageImport";
import Sidebar from "./Menu";

function Header() {
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  const onHandleLogout = () => {
    navigate("/login");
    localStorage.setItem("login", false);
  };
  return (
    <div className="flex justify-start mb-6 items-center bg-gray-700 h-16 fixed top-0 left-0 w-full">
      <img src={Logo} width="50" height={"20px"} className="rounded-xl h-10 mx-2 " />
      <div className="text-lg text-white font-semibold mr-24 " onClick={() => navigate("/home")}>CMS Portal</div>
      <Sidebar />
      {login && (
        <div className="fixed right-2">
        <Button variant="contained" onClick={onHandleLogout} >
          LogOut
        </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
