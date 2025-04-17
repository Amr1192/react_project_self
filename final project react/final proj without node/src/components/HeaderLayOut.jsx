import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function HeaderLayOut() {
  return (
    <div>
      <NavBar />
      <div className="">
        <Outlet className="pt-5" />
      </div>
      <Footer />
    </div>
  );
}
