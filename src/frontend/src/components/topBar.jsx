import React from "react";
import { login } from "../utils/auth"


const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbarContainer">
        <div className="logo">
          <img src="" alt="logo image" className="logoIMG" />
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
          <button className="BtnSave" onClick={login}>
            As recruitor
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopBar;