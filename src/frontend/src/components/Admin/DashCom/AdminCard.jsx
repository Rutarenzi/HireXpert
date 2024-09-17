import { Link } from "react-router-dom"
import { GiWallet } from "react-icons/gi"

const AdminCard =({Name, Amount})=>{
    return(
        <>
          <div className="AAccBox">
             <div className="AAccTitle">
                 <p className="AccText">{Name}</p>
             </div>
             <hr></hr>
             <div className="AccNumber">
                 {Amount}
             </div>
          </div> 
        </>
    )
}
export default AdminCard