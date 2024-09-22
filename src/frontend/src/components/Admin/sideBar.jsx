import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";

const ASideBar = () => {
  const [sidebarWidth, setSidebarWidth] = useState("0");

  const openNav = () => {
    setSidebarWidth("250px");
  };

  const closeNav = () => {
    setSidebarWidth("0");
  };

  return (
    <>
      <div className="sidenav" style={{ width: sidebarWidth }}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <Link className="anchor" to="/">
          <span className="aIcon"></span><span>Home</span>
        </Link>
        <Link className="anchor" to="/Dashboard">
          <span className="aIcon"></span><span>Dashboard</span>
        </Link>
        <Link className="anchor" to="/CreateJob">
          <span className="aIcon"></span><span>Create Job</span>
        </Link>
        <div className="btn-logout">
          <button className="BtnSave" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <span className="openbtn" style={{ fontSize: "30px", cursor: "pointer" }} onClick={openNav}>
        &#9776;
      </span>
    </>
  );
};

export default ASideBar;
