import React from "react";
import AdminCard from "../../components/Admin/DashCom/AdminCard";
import UsersTable from "../../components/Admin/DashCom/UsersTable";

const ApplicantsPage=()=>{
    return(
        <div className="AAccPage">
    
        <div className="AAccConUpper">
           <AdminCard Name="Applicants" Amount="0"/>
           <AdminCard Name="Interviewed" Amount="0"/>
           <AdminCard Name="Rejected" Amount="0"/>
           <AdminCard Name="Hired" Amount="0"/>
        </div>
             
            <br></br>
            <div className="AAccConDown">
             <UsersTable/>
            </div>
            </div>
    )
}

export default ApplicantsPage;