import React from "react";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import TimeAgo from "react-timeago";

const Card=({company,hours,position,description,id})=>{
  const navigate =useNavigate();
  const goToDetail=()=>{
    navigate(`/jobDetail/${id}`)
  }
  const truncateContent = (text, limit=100) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
    return(
        <div className="Card">
           <div className="CardHeader">
             <h4>{company}</h4>
             <p><TimeAgo date={hours}/></p>
           </div>
           <div className="CardPosition">
             <h3>{position}</h3>
           </div>
           <div className="Description">
           <ReactQuill value={truncateContent(description)} readOnly={true}
   theme={"bubble"}/>
           </div>
           <div className="CardButton">
              <button className="ApplyBtn" onClick={goToDetail}>View</button>
           </div>
        </div>
    )
}

export default Card;