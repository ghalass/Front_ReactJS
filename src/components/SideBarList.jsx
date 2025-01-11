import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function SideBarList({ title, listItems }) {
  const location = useLocation();
  const path = location.pathname;

  const items = listItems.map((item, i) => {
    const route = title.toLowerCase() + item.to;

    const cls = `nav-link ${path === route ? "active collapse" : "collapsed"}`;
    const icon = "bi bi-circle";
    return (
      <li key={i}>
        <NavLink to={route} className={cls}>
          <i className={icon}></i>
          {item.title}
        </NavLink>
      </li>
    );
  });
  return (
    <>
      <li className="nav-item">
        <a
          className={`nav-link ${
            !path.startsWith(`/${title.toLowerCase()}`) ? "collapsed" : ""
          }`}
          data-bs-target="#components-nav"
          data-bs-toggle="collapse"
          href="#"
        >
          <i className="bi bi-menu-button-wide"></i>
          <span>{title}</span>
          <i className="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul
          id="components-nav"
          className={`nav-content collapse ${
            path.startsWith("/" + title.toLowerCase()) ? "show" : ""
          }`}
          data-bs-parent="#sidebar-nav"
        >
          {items}
        </ul>
      </li>
    </>
  );
}

export default SideBarList;
