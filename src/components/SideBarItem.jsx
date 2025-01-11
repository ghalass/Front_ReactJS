import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function SideBarItem({ to, title }) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <li className={`nav-item `}>
        <NavLink
          to={to}
          className={`nav-link ${path !== to ? "collapsed" : ""} `}
        >
          <i className="bi bi-grid"></i>
          {title}
        </NavLink>
      </li>
    </>
  );
}

export default SideBarItem;
