import React from "react";
import ReactQuill from "react-quill"
import {useNavigate } from "react-router-dom"; 

const ShortDetail=({title,company,description,id})=>{
    const navigate = useNavigate();
  const applyNav=()=>{
    navigate(`/jobDetail/apply/${id}`)
    return null
  }

 return(
    <>
    <div className="ViewContainer">
        <div className="ViewHeader">
           <h3 className="position">{title}</h3>
            <p><span className="Company">Company:</span>{company}</p>
        </div>
         <div className="JobDescription">
        <ReactQuill value={description}  readOnly={true}
   theme={"bubble"}/>
         </div>
         <div className="btnContainer">
            <button className="ApplyBig" onClick={applyNav}>Apply</button>
         </div>
    </div>
    </>
 )
}

export default ShortDetail; 