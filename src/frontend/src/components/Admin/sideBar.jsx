import { Link } from "react-router-dom";
const ASideBar =() => {
    return(
      <>
        <div className="sideBar">
           <div className="LinkBar">
              <ul className="ul-list">
                <Link className="anchor" to="/Admin">
                        <span className="aIcon"></span><span>Dashboard</span>
                </Link>
                <Link className="anchor" to="/AllLevel" >
                        <span className="aIcon" ></span><span>All Level</span>
                </Link>
                <Link className="anchor" to='/CreateLevel'>
                        <span className="aIcon"></span><span>Create Level</span>
                </Link>
                <Link className="anchor" to="/AllUsers">
                        <span className="aIcon" ></span><span>All Users</span>
                </Link>
              </ul>
           </div>
        </div>
      </>
    )
}

export default ASideBar;