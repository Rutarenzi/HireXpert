import  { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AiOutlineMore } from "react-icons/ai";
import { UpdateApplicantsThunk } from "../../../redux/action/updateApplication";

  const ActionMore=({user})=> {
    const [show,setShow] = useState(false);
    const dispatch=useDispatch();

    const statusChange=async(data)=>{
      dispatch(UpdateApplicantsThunk(data,user))
    }
   
    return( 
     <>
        <div className="threeAction" onClick={()=>{setShow(!show)}}>
            <AiOutlineMore />
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