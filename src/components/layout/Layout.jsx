import React from "react";
import TopNavbar from "../TopNavbar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import ParallexWrapper from "../ParallexWrapper";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
