import { useState,useEffect,useMemo } from "react";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import {BiEdit} from "react-icons/bi";
import TimeAgo from "react-timeago";
import ActionThree from "./ActionThree";
import Pagination from "./Pagenation";
import { useDispatch, useSelector } from "react-redux";
import { DeleteJobThunk } from "../../../redux/action/deleteJob";
import { AdminJobThunk } from "../../../redux/action/getAdminJob";
const AdminTable=()=>{
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminJobThunk());
  }, [dispatch]);
 
  const {loading,adminJob,error }= useSelector((state) => state.jobAdmin);
   const JobArray = adminJob;
  const currentPosts = useMemo(() => {
    if (JobArray) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      return JobArray.slice(indexOfFirstPost, indexOfLastPost);
    }
    return [];
  }, [JobArray, currentPage, postsPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteJob=async(id)=>{
    if(id){
      await dispatch(DeleteJobThunk(id))
    }
  }
  const navigate = useNavigate();
  const editJob=(id)=>{
    if(id){
      navigate(`/EditJob/${id}`);
      return null
     }
  }
  return (
    <div className="AdminTable">
        <>
         {
          loading?(<p>loading</p>): !adminJob?(
            <p>NO USER</p>
          ):(
            <>
             <table className="ATableAcc">
          <thead>
         <tr className="AAcctr">
            <th>JobId</th>
            <th>recruiterId</th>
            <th>company</th>
            <th>jobTitle</th>
            <th>requirements</th>
            <th>salaryRange</th>
            <th>employmentType</th>
            <th>industry</th>
            <th>applicants</th>
            <th>CreatedAt</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
         </thead>
            <tbody>
              {currentPosts.map((item,index)=>(
                <tr className="AAcctr" key={index+1}>
                <td>{item.jobId}</td>
                <td>{item.recruiterId}</td>
                <td>{item.company}</td>
                <td>{item.jobTitle}</td>
                <td>{item.requirements.educationLevel}</td>
                <td>{item.salaryRange.min}-{item.salaryRange.max}</td>
                <td>{item.employmentType}</td>
                <td>{item.industry}</td>
                <td>{item.applicants.length}</td>
                <td><TimeAgo date={item.createdAt} /></td>
                <td>{item.status}</td>
                <td>
                <div className="table-actions">
                      <Link
                        to="/edituser"
                        className="action blue"
                        onClick={()=>{editJob(item.jobId)}}
                      >
                        <BiEdit/>
                      </Link>
                      <Link
                        to={`#`}
                        className="action red"
                        onClick={()=>{deleteJob(item.jobId)}}
                      >
                        <AiTwotoneDelete/>
                      </Link>
                      <ActionThree user={item.jobId}/>         
                    </div></td>
              </tr>
              ))}
                
            </tbody>
          </table>
          <div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={JobArray.length}
              paginate={paginate}
            />
          </div>
            </>
          )
         }
        </>
    
    </div>
  );
};

export default AdminTable;