import { Link } from "react-router-dom";
const ASideBar =() => {
    return(
      <>
        <div className="sideBar">
           <div className="LinkBar">
              <ul className="ul-list">
                <Link className="anchor" to="/Dashboard">
                        <span className="aIcon"></span><span>Dashboard</span>
                </Link>
                <Link className="anchor" to='/CreateJob'>
                        <span className="aIcon"></span><span>Create Job</span>
                </Link>
              </ul>
           </div>
        </div>
      </>
    )
}

export default ASideBar;