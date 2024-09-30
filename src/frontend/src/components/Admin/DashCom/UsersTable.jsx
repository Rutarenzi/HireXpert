import { useState,useEffect,useMemo } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import ActionMore from "./ActionMore";
import Pagination from "./Pagenation";
import TimeAgo from "react-timeago";
import { JobApplicantsThunk } from "../../../redux/action/getJobApplicants";
import {  ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";


const UsersTable=()=>{
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalContent, setModalContent] = useState("");  // Content to display in the modal

  // Function to open the modal with specific content
  const openModal = (content) => {
    console.log(content)
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {id }= useParams();

  useEffect(() => {
   
    if(!id){
       Navigate('/')
    }
    dispatch(JobApplicantsThunk(id));
  }, [dispatch]);


  const { loads,jobApplicants, error } = useSelector((state)=>state.jobApplicants)
  
  const ApplicantArray = jobApplicants || [];

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
        {loads?(<div style={{textAlign: "center"}}>
           <CircularProgress size={50} color="primary" />
        </div>): ((ApplicantArray.length ==0)|| error)?(
            <div style={{textAlign: "center"}}>
            <p>NO one apply</p>
         </div>
          ):(
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
               <td>{index}</td>
               <td>{item.firstname}</td>
               <td>{item.secondname}</td>
               <td>{item.email}</td>
               <td>{item.gender}</td>
               <td>{item.country}</td>
               <td>{item.education}</td>
               <td>{item.skills[0]}</td>
               <td>{item.experience.toString()} years</td>
               <td  onClick={() => {openModal(item.coverletter)}}><span className ="viewer">View</span></td>
               <td>{item.status}</td>
               <td><TimeAgo date={item.submittedAt} /></td>
               <td> 
                 <div className="table-actions">
                   <Link
                     to={`#`}
                     className="action red"
                   >
                     <AiTwotoneDelete/>
                   </Link>
                   <ActionMore user={item.applicationId} job={item.jobId}/>         
                 </div></td>
             </tr> 
             ))}
            </tbody>
           </table>
           {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p style={{color:"black"}}>{modalContent}</p>
          </div>
        </div>
      )}
           <div>
           <Pagination 
           postsPerPage={postsPerPage}  
           totalPosts={ApplicantArray.length}
           paginate={paginate} 
           />
           </div>
        </>)}
   </>
   <ToastContainer />
     </div>
    )
}
export default UsersTable;
