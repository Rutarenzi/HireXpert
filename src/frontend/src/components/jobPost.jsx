import React from "react";
import { useNavigate } from "react-router-dom"; 

const JobPost=({education,experience,skills,id})=>{
  
   const navigate = useNavigate();
   const applyNav=()=>{
     navigate(`/jobDetail/apply/${id}`)
     return null
   }
    return(
       <div className="JobPostDetail">
             <div className="JobPostCard">
                 <h3 className="Requirement">Requirements</h3>
                 <p><span className="spanTitle">Education:</span>   <span>{education}</span></p>
                 <p><span className="spanTitle">Experience:</span>   <span>{experience}</span></p>
                 
                 <h3 className="Requirement">Skills</h3>
                 <div className="SkillContainer"> 
                   {
                     skills.map((item)=>(<p className="skillHighlight">{item}</p> ))
                   }
                    
                 </div>

                 <div className="btnContainer">
            <button className="ApplyBig" onClick={applyNav}>Apply</button>
         </div>
             </div>
       </div>
    )

}


export default JobPost