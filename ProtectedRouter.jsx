import React from "react";
import { Login } from "./src/Component";

export const ProtectedRoute = ( props ) => {
 const {Component} = props;
  let isLoggedIn = false;
  const login = localStorage.getItem("login");
  if (login) {
    isLoggedIn = true;
  }
console.log(Component,isLoggedIn);

  if (isLoggedIn) {
    return <Component />;
  } else {
    return (
        <Login />
    );
  }
};