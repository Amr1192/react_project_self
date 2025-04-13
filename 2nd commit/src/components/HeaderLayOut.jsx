import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./footer";

export default function HeaderLayOut() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
