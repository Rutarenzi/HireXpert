import { useState,useEffect,useMemo } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import {BiEdit} from "react-icons/bi";
import ActionMore from "./ActionMore";
import Pagination from "./Pagenation";
import TimeAgo from "react-timeago";
import { Applicant } from "../../../utils/data";

const UsersTable=({searcher})=>{
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  
 
  const ApplicantArray = Applicant;
  const currentPosts = useMemo(() => {
    if (ApplicantArray) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      return ApplicantArray.slice(indexOfFirstPost, indexOfLastPost);
    }
    return [];
  }, [ApplicantArray, currentPage, postsPerPage]);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return(
     <div>
           <>
         <table className="ATableAcc">
           <thead>
           <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>SecondName</th>
            <th>E-mail</th>
            <th>Gender</th>
            <th>Country</th>
            {/* <th>ResumeUrl</th> */}
            <th>Education</th>
            <th>skill</th>
            <th>experience</th>
            <th>coverLetter</th>
            <th>status</th>
            <th>Submitted</th>
            <th>Action</th>
            </tr>
           </thead>
            <tbody>
             {currentPosts.map((item, index)=>(
               <tr className="AAcctr" key={index+1}>
               <td>{item.applicationId}</td>
               <td>{item.firstName}</td>
               <td>{item.secondName}</td>
               <td>{item.email}</td>
               <td>{item.gender}</td>
               <td>{item.country}</td>
               <td>{item.educationLevel}</td>
               <td>{item.skill[0]}</td>
               <td>{item.experience}</td>
               <td>{item.coverLetter}</td>
               <td>{item.status}</td>
               <td>{item.createdAt}</td>
               <td> 
                 <div className="table-actions">
                   <Link
                     to="/edituser"
                     className="action blue"
                   >
                     <BiEdit/>
                   </Link>
                   <Link
                     to={`#`}
                     className="action red"
                   >
                     <AiTwotoneDelete/>
                   </Link>
                   <ActionMore user="1"/>         
                 </div></td>
             </tr> 
             ))}
            </tbody>
           </table>
           <div>
           <Pagination 
           postsPerPage={postsPerPage}  
           totalPosts={ApplicantArray.length}
           paginate={paginate} 
           />
           </div>
   </>
     </div>
    )
}
export default UsersTable;