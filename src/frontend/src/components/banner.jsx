import { useState,useEffect,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./card";
import Pagination from "./Admin/DashCom/Pagenation";
import { AllJobThunk } from "../redux/action/getAllJob";


const Banner=()=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(10);
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(AllJobThunk());
    }, [dispatch]);
   
    const { loading,AllJob,error }= useSelector((state) => state.jobAdmin);
   const JobPost = AllJob
    // const JobPost =Array.from({length:20},(_,index)=>({
    //     company:"Rutx-hub ltd",
    //    hours:"2 hours",
    //    position:"Senior software engineer",
    //    description:`Power of AI Summarization for Effortless InsighTransform Your Note-Taking,Experience the 
    //             Power of AI Summarization for Effortless Insights
    //             Power of AI Summarization for Effortless Insights!`,
    //    id:"1"
    // }))
    const currentPosts = useMemo(() => {
        if (JobPost) {
          const indexOfLastPost = currentPage * postsPerPage;
          const indexOfFirstPost = indexOfLastPost - postsPerPage;
          return JobPost.slice(indexOfFirstPost, indexOfLastPost);
        }
        return [];
      }, [JobPost, currentPage, postsPerPage]);
    
      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      
    return(
   <>
     <div className="BannerContainer">
        <div className="welcome">
            <div className="WelcomeContent">
            <h3 className="LogoTitle">HireXpert</h3>
            <p className="WelcomeText">Transform your recruitment process: <br></br>streamline job 
              postings and gain effortless insights for faster, smarter hiring</p>
            <button className="loginBtn">As recruitor</button>
            </div>
        </div>
     </div>
     <div className="Category">
        <div className="ListContainer">
           <ul className="scroll-container">
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
            <li><a>Developers</a></li>
           </ul>
        </div>
     </div>
     <div className="JobPostContainer">
         {
          loading?(<p>loading</p>): !AllJob?(
            <p>NO USER</p>
          ):(<>
          <div className="JobPostCenter">
               {currentPosts.map((job,index)=>(
                 <Card
                 company={job.company}
                 hours={job.hours} 
                 position={job.position}
                 description={job.description}
                 id={job.id}
                   key={index}
                  />
               ))}
               <div>
              
          </div>

         </div>
         <Pagination
              postsPerPage={postsPerPage}
              totalPosts={JobPost.length}
              paginate={paginate}
            /></>)
         }
     </div>
   </>
    )
}

export default Banner