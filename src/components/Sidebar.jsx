import React from "react";
import SideBarList from "./SideBarList";
import SideBarItem from "./SideBarItem";

const Sidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <SideBarItem to={"/"} title={"Home"} />

          <SideBarList
            title="Configs"
            listItems={[
              { to: "/sites", title: "Sites" },
              { to: "/typeparcs", title: "Typeparcs" },
            ]}
          />

          <li className="nav-heading">Pages</li>

          <SideBarItem to={"/details/profile"} title={"Profile"} />
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
