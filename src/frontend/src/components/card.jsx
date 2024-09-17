import React from "react";

const Card=({company,hours,position,description,id})=>{
    return(
        <div className="Card">
           <div className="CardHeader">
             <h4>{company}</h4>
             <p>{hours}</p>
           </div>
           <div className="CardPosition">
             <h3>{position}</h3>
           </div>
           <div className="Description">
               {description}
           </div>
           <div className="CardButton">
              <button className="ApplyBtn" href={`/jobDetail/${id}`}>View</button>
           </div>
        </div>
    )
}

export default Card;