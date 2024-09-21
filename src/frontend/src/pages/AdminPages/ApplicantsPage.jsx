import React from "react";
import AdminCard from "../../components/Admin/DashCom/AdminCard";
import UsersTable from "../../components/Admin/DashCom/UsersTable";

const ApplicantsPage=()=>{
    return(
        <div className="AAccPage">
    
        <div className="AAccConUpper">
           <AdminCard Name="Users" Amount="300"/>
           <AdminCard Name="Total Amount" Amount="400"/>
           <AdminCard Name="Total Deposit" Amount="500"/>
           <AdminCard Name="Total Withdraw" Amount="300"/>
           <AdminCard Name="request withdraw" Amount="300"/>
        </div>
             
            <br></br>
            <div className="AAccConDown">
             <UsersTable/>
            </div>
            </div>
    )
}

export default ApplicantsPage;