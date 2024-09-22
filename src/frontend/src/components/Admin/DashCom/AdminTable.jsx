import { useState,useEffect,useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress'
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
import { ToastContainer } from "react-toastify";


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
      window.location.reload()
    }

  }
   const {loader } = useSelector((state)=>state.deleteJob)
  return (
    <div className="AdminTable">
        <>
         {
          loading?(<div style={{textAlign: "center"}}>
              <CircularProgress size={50} color="primary" />
          </div>): (!adminJob || error)?(
            
            <div style={{textAlign: "center"}}>
             <p>You have not posted any job</p>
          </div>
          ):(
            <>
             <table className="ATableAcc">
          <thead>
         <tr className="AAcctr">
            <th>JobId</th>
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
                <td><Link
                        to={`/Applicants/${item.jobId}`}
                      >{index+1}</Link>
                      </td>
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
                        to={`/EditJob/${item.jobId}`}
                        className="action blue"
                      >
                        <BiEdit/>
                      </Link>
                      <span
                        className="action red"
                        onClick={()=>{deleteJob(item.jobId)}}
                      >
                        {loader?<CircularProgress size={20} color="primary" />:<AiTwotoneDelete/>}
                      </span>
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
    <ToastContainer />
    </div>
  );
};

export default AdminTable;