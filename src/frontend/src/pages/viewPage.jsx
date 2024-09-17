import React from "react";
import ShortDetail from "../components/shortDetail";
import JobPost from "../components/jobPost";
import TopBar from "../components/topBar";
const ViewPage=()=>{
  return(
    <>
    <div className="ViewCenter">
      <ShortDetail/>
      <JobPost/>
    </div>
     
    </>
  )
}

export default ViewPage;