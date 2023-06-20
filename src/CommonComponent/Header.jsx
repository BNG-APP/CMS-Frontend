import { Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Utilities/ImageImport";
import Sidebar from "./Menu";
import { Link, useLocation } from 'react-router-dom';
import { generateBreadcrumbs } from '../main';
function Header() {
  const login = localStorage.getItem("login");
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const onHandleLogout = () => {
    navigate("/login");
    localStorage.setItem("login", false);
  };
  
  return (
    <div className="flex justify-start mb-6 items-center bg-[#01579B] h-16 fixed top-0 left-0 w-full z-20">
       <Sidebar />
      <img src={Logo} width="50" height={"20px"} className="rounded-xl h-10 -ml-52 mr-2" />
      <div className="text-lg text-white font-semibold mr-2 " onClick={() => navigate("/home")}>CMS Portal</div>
     
      <nav className=" text-white ml-4 z-10">
      <ul className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            <Link
              to={breadcrumb.path}
              className="text-white"
            >
              {breadcrumb.breadcrumb}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="text-gray-400 mx-2">{'>'}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
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
