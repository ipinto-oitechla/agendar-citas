import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../logo.png";

const Layout = () => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "45vw" }}
        />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
