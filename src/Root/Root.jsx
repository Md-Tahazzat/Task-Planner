import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar";

const Root = () => {
  return (
    <div className="w-full">
      <Navbar></Navbar>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
