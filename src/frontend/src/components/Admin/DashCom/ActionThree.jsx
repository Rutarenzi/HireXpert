import  { useState,useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {ToastContainer} from "react-toastify"
import OutsideClickHandler from "react-outside-click-handler";
import {AiOutlineMore } from "react-icons/ai";



const ActionThree=({user})=> {
    const [toggle, setToggle] = useState(" ");
    const [show,setShow] = useState(false);
    const handleBonus =() => {
        setToggle("bonnus")
        onOpen()
      }
      const handleLevel =() => {
        setToggle(" ")
        onOpen()
      }
 
   
   const [selectedOption, setSelectedOption] = useState('');

   const handleSelectChange = (event) => {
     setSelectedOption(event.target.value);
   };
 
   const changeLevel =(data) => {
     data.preventDefault();
     if(!selectedOption){
       return setError("Please Select a Level")
     } 
   }

    return( 
     <>
        <div className="threeAction" onClick={()=>{setShow(!show)}}>
            <AiOutlineMore />
            {
               show && <OutsideClickHandler onOutsideClick={()=>setShow(false)}>
                 <div className="ActionTip">
                 <p className="ActionP" onClick={handleBonus}>Bonus</p>
                  <p className="ActionP" onClick={handleLevel}>Level</p>
                 </div> 
               </OutsideClickHandler>
            }
        </div>
        <ToastContainer />
     </>
    )
}

export default ActionThree