import React from "react";
import { login,logout } from "../utils/auth"
import { Link } from "react-router-dom";


const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbarContainer">
        <div className="logo">
        <Link  to='/'>
        {/* <img src="" alt="logo image" className="logoIMG" /> */}
        <p>HireXpert</p>
        </Link>
          
        </div>
        <div className="InputSearch">
          <div className="SearchContainer">
            <input
              type="text"
              name="query"
              className="InputKey"
              placeholder="Search for a note and summary"
            />
            <button
              className="BtnSaver">
              Search
            </button>
          </div></div>
        <div className="btn-logout">
          {window.auth.isAuthenticated ?<button className="BtnSave2" onClick={logout}>
            Logout
          </button>:<button className="BtnSave2" onClick={login}>
            As recruitor
          </button>}
          
        </div>
      </div>
    </div>
  )
}

export default TopBar;