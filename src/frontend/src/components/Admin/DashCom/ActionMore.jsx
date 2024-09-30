import  { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch,useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AiOutlineMore } from "react-icons/ai";
import { UpdateApplicantsThunk } from "../../../redux/action/updateApplication";
import { CircularProgress } from "@mui/material";
import { JobApplicantsThunk } from "../../../redux/action/getJobApplicants";

  const ActionMore=({user,job})=> {
    const [show,setShow] = useState(false);
    const dispatch=useDispatch();

    const statusChange=async(status)=>{
   
     await  dispatch(UpdateApplicantsThunk({status,user}));
     await dispatch(JobApplicantsThunk(job))
    }
   const { loads} =useSelector((state)=>state.updateApplicant)
    return( 
     <>
        <div className="threeAction" onClick={()=>{setShow(!show)}}>
        {loads?<CircularProgress size={20} color="white" /> :<AiOutlineMore />}
            {
             show && <OutsideClickHandler onOutsideClick={()=>setShow(false)}>
                 <div className="ActionTip">

                 <p className="ActionP" onClick={()=>{statusChange("pending")}}>pending</p>
                  <p className="ActionP" onClick={()=>{statusChange("interviewed")}}>interviewed</p>
                  <p className="ActionP" onClick={()=>{statusChange("rejected")}}>rejected</p>
                  <p className="ActionP" onClick={()=>{statusChange("hired")}}>hired</p>
                  
                 </div> 
               </OutsideClickHandler>
            }
        </div>
        
        
        <ToastContainer hideProgressBar/>
     </>
    )
}

export default ActionMore
