import React from "react";

const JobPost=()=>{
    return(
       <div className="JobPostDetail">
             <div className="JobPostCard">
                 <h3 className="Requirement">Requirements</h3>
                 <p><span className="spanTitle">Education:</span>   <span>Bachelors</span></p>
                 <p><span className="spanTitle">Experience:</span>   <span>5 years</span></p>
                 
                 <h3 className="Requirement">Skills</h3>
                 <div className="SkillContainer"> 
                    <p className="skillHighlight">Project management</p> 
                    <p className="skillHighlight">Project management</p>
                    <p className="skillHighlight">Project management</p>
                    <p className="skillHighlight">Project management</p>
                    <p className="skillHighlight">Project management</p>
                    <p className="skillHighlight">Project management</p>  
                 </div>

                 <div className="btnContainer">
            <button className="ApplyBig">Apply</button>
         </div>
             </div>
       </div>
    )

}


export default JobPost