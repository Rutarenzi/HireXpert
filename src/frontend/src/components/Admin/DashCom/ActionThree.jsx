import  { useState } from "react";
import {ToastContainer} from "react-toastify"
import OutsideClickHandler from "react-outside-click-handler";
import {AiOutlineMore } from "react-icons/ai";



const ActionThree=({user})=> {
    const [show,setShow] = useState(false);

    const statusChange=async(data)=>{
      console.log(data)
  }
 

    return( 
     <>
        <div className="threeAction" onClick={()=>{setShow(!show)}}>
            <AiOutlineMore />
            {
               show && <OutsideClickHandler onOutsideClick={()=>setShow(false)}>
                 <div className="ActionTip">
                 <p className="ActionP" onClick={()=>{statusChange("open")}}>Bonus</p>
                  <p className="ActionP" onClick={()=>{statusChange("closed")}}>Level</p>
                 </div> 
               </OutsideClickHandler>
            }
        </div>
        <ToastContainer />
     </>
    )
}

export default ActionThree