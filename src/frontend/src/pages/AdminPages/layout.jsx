import { Outlet } from "react-router";
import "./adminStyle.css";
import ASideBar from "../../components/Admin/sideBar";


const LayoutAdmin=() => {
    return(<>
          <div className="Maindashboard">
             <ASideBar />
            <div className="mainDash">
               <Outlet />
            </div>
          </div>
    </>
    
    )
}

export default LayoutAdmin