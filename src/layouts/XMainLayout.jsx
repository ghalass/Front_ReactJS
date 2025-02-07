import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout() {
  return (
    <>
      <Header />

      <Sidebar />

      <Outlet />
    </>
  );
}

export default MainLayout;
