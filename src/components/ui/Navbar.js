import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavbarData } from "./NavbarData";
import "../../App.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars" onClick={showSidebar}>
          {/* Aquí puedes poner un ícono o texto para abrir el menú */}
          ☰
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              x
            </Link>
          </li>
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;