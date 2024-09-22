import { CircularProgress } from "@mui/material";
import AdminCard from "../components/Admin/DashCom/AdminCard";
import AdminTable from "../components/Admin/DashCom/AdminTable"
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { JobStatThunk } from "../redux/action/jobStat";

const DashPage =()=>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(JobStatThunk());
      }, [dispatch]);
    
     const {  loadings,JobStat,error} = useSelector((state)=>state.JobStat)
    return(
        <>
<div className="AAccPage">
{loadings?(<div style={{textAlign: "center"}}>
              <CircularProgress size={50} color="primary" />
          </div>): (!JobStat || error)?(
             <div className="AAccConUpper">
             <AdminCard Name="Total Jobs" Amount="0"/>
             <AdminCard Name="Open Jobs" Amount="0"/>
             <AdminCard Name="Closed Jobs" Amount="0"/>
             <AdminCard Name="Industry" Amount="0"/>
         
          </div>
           
          ):(
            <div className="AAccConUpper">
            <AdminCard Name="Total Jobs" Amount={JobStat.totalJobs}/>
            <AdminCard Name="Open Jobs" Amount={JobStat.openJobs}/>
            <AdminCard Name="Closed Jobs" Amount={JobStat.closedJobs}/>
            <AdminCard Name="Industry" Amount={JobStat.totalIndustries}/>
         </div>
          )}
    
        <br></br>
        <div className="AAccConDown">
         <AdminTable />
        </div> 
        </div>
        
        </>
    )
}

export default DashPage