import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShortDetail from "../components/shortDetail";
import JobPost from "../components/jobPost";
import { useDispatch, useSelector } from "react-redux";
import { OneJobThunk } from "../redux/action/getOneJob";
import { ClipLoader } from "react-spinners";
import { CircularProgress } from "@mui/material";

const ViewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate('/');
      } else {
        await dispatch(OneJobThunk(id));
      }
    };
    fetchData();
  }, [dispatch, id, navigate]);

  const { load, OneJob, error } = useSelector((state) => state.OneJob);

  return (
    <div className="ViewCenter">
      {load ? (
        <div style={{textAlign: "center"}}>
        <CircularProgress size={50} color="primary" />
    </div>
      ) : (!OneJob || error) ? (
        <p>This job does not exist</p>
      ) : (
        <>
          <ShortDetail title={OneJob.jobTitle} company={OneJob.company} description={OneJob.jobDescription} id={OneJob.jobId} />
          <JobPost education={OneJob.requirements.educationLevel} experience={OneJob.requirements.experience} skills={OneJob.requirements.skill} id={OneJob.jobId} />
        </>
      )}
    </div>
  );
};

export default ViewPage;
