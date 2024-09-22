import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "./card";
import Pagination from "./Admin/DashCom/Pagenation";
import { AllJobThunk } from "../redux/action/getAllJob";
import { Category } from "../utils/data";
import { login } from "../utils/auth.js";
import { ClipLoader } from "react-spinners";

const Banner = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [searcher, setSearcher] = useState(" ");

  const dispatch = useDispatch();
  const fetchAllJobs = useCallback(async () => {
    dispatch(AllJobThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  const category = Category;
  const { loading, AllJob, error } = useSelector((state) => state.AllJob);
  const JobPost = AllJob || [];

  // Filter logic based on searcher (selected category)
  const filteredPosts = useMemo(() => {
    if (searcher === " " || searcher === "All") {
      return JobPost; // Show all jobs if "All" is selected or no specific category
    }
    return JobPost.filter((job) => (job.industry== searcher));
  }, [JobPost, searcher]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage, postsPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const navigate = useNavigate();
  const goToDash=()=>{
    navigate('/Dashboard')
  }
  return (
    <>
      <div className="BannerContainer">
        <div className="welcome">
          <div className="WelcomeContent">
            <h3 className="LogoTitle">HireXpert</h3>
            <p className="WelcomeText">
              Transform your recruitment process: <br />
              streamline job postings and gain effortless insights for faster,
              smarter hiring
            </p>
           { window.auth.isAuthenticated ?
           <button className="loginBtn" onClick={goToDash}>
              Dashboard
            </button>: <button className="loginBtn" onClick={login}>
              As recruiter
            </button>}
            
          </div>
        </div>
      </div>
      <div className="Category">
        <div className="ListContainer">
          <ul className="scroll-container">
            <li onClick={() => setSearcher("All")}>
              <a>All</a>
            </li>
            {category.map((item, index) => (
              <li key={index} onClick={() => setSearcher(item)}>
                <a>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="JobPostContainer">
        {loading ? (
          <div style={{textAlign: "center"}}>
          <ClipLoader color={"#123abc"} loading={loading} size={50}/>
      </div>
        ) : ((JobPost.length == 0) || error) ? (
          <div style={{textAlign: "center"}}>
           <p>No available Job</p>
      </div>
        ) : (
          <>
            <div className="JobPostCenter">
              {currentPosts.map((job, index) => (
                <Card
                  company={job.company}
                  hours={job.createdAt}
                  position={job.jobTitle}
                  description={job.jobDescription}
                  id={job.jobId}
                  key={index}
                />
              ))}
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredPosts.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Banner;
