import  { useState,useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {AiOutlineMore } from "react-icons/ai";

  const ActionMore=({user})=> {
    const [show,setShow] = useState(false);
   
    return( 
     <>
        <div className="threeAction" onClick={()=>{setShow(!show)}}>
            <AiOutlineMore />
            {
             show && <OutsideClickHandler onOutsideClick={()=>setShow(false)}>
                 <div className="ActionTip">
                 <p className="ActionP">Bonus</p>
                  <p className="ActionP">Level</p>
                  <p className="ActionP">Profile</p>
                  <p className="ActionP">Status</p>
                  
                 </div> 
               </OutsideClickHandler>
            }
        </div>
        
        
        <ToastContainer hideProgressBar/>
     </>
    )
}

export default ActionMore