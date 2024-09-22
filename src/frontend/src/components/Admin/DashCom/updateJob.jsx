import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Autocomplete, Chip, CircularProgress, MenuItem } from "@mui/material";
import TextInputer from "./textInput";
import { JobUpdateValid } from "../../../validation/jobValid";
import { UpdateJobThunk } from "../../../redux/action/editjob";
import { OneJobThunk } from "../../../redux/action/getOneJob";
import { Skills } from "../../../utils/data";

const UpdateJob = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [textedit, setTexteditor] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const options = Skills;

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    dispatch(OneJobThunk(id));
  }, [dispatch, id, navigate]);

  const { load, OneJob, error } = useSelector((state) => state.OneJob);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(JobUpdateValid),
    defaultValues: {
      skills: [], // Initialize with an empty array
    },
  });

  // Update state when OneJob changes
  useEffect(() => {
    if (OneJob) {
      setSelectedTags(OneJob.requirements.skill);
      setTexteditor(OneJob.jobDescription);
      setMinSalary(OneJob.salaryRange.min);
      setMaxSalary(OneJob.salaryRange.max);
    }
  }, [OneJob]);

  const handleChange = (value) => {
    setTexteditor(value);
  };

  const onTagsChange = (event, newValue) => {
    setSelectedTags(newValue);
    setValue("skills", newValue);
    clearErrors("skills");
  };

  const submit = async (data) => {
    const { company, jobTitle, education, experience, employmentType, industry, skills } = data;
    const AllData = {
      company,
      jobTitle,
      jobDescription: textedit,
      requirements: {
        skill: skills,
        educationLevel: education,
        experience,
      },
      salaryRange: {
        min: minSalary,
        max: maxSalary,
      },
      employmentType,
      industry,
    };

    if (id) {
      dispatch(UpdateJobThunk({ AllData, id }));
    }
  };
  const { loadz } = useSelector((state)=>state.updateJob)
  return (
    <div className="CreateContainer">
      <div className="FormCreate">
        {load ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress size={50} color="primary" />
          </div>
        ) : !OneJob ? (
          <div style={{ textAlign: "center" }}>No Job Available</div>
        ) : (
          <form onSubmit={handleSubmit(submit)} noValidate>
            {/* Company */}
            <div className="TextField">
              <TextField
                {...register("company")}
                label="Company"
                fullWidth
                defaultValue={OneJob.company}
                error={!!errors.company}
                helperText={errors.company?.message}
                variant="standard"
              />
            </div>

            {/* Job Title */}
            <div className="TextField">
              <TextField
                {...register("jobTitle")}
                label="Job Title"
                fullWidth
                defaultValue={OneJob.jobTitle}
                error={!!errors.jobTitle}
                helperText={errors.jobTitle?.message}
                variant="standard"
              />
            </div>

            {/* Education Level */}
            <div className="TextField">
              <TextField
                {...register("education")}
                label="Education Level"
                select
                fullWidth
                required
                defaultValue={OneJob.requirements.educationLevel}
                error={!!errors.education}
                helperText={errors.education?.message}
                variant="standard"
              >
                <MenuItem value="Primary">Primary School</MenuItem>
                <MenuItem value="Secondary">Secondary School</MenuItem>
                <MenuItem value="University">University Level</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </div>

            {/* Experience */}
            <div className="TextField">
              <TextField
                {...register("experience")}
                label="Experience"
                fullWidth
                required
                defaultValue={OneJob.requirements.experience}
                error={!!errors.experience}
                helperText={errors.experience?.message}
                variant="standard"
              />
            </div>

            {/* Employment Type */}
            <div className="TextField">
              <TextField
                {...register("employmentType")}
                label="Employment Type"
                select
                fullWidth
                required
                defaultValue={OneJob.employmentType}
                error={!!errors.employmentType}
                helperText={errors.employmentType?.message}
                variant="standard"
              >
                <MenuItem value="fullTime">Full-Time</MenuItem>
                <MenuItem value="partTime">Part-Time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
              </TextField>
            </div>

            {/* Industry */}
            <div className="TextField">
              <TextField
                {...register("industry")}
                label="Industry"
                select
                fullWidth
                required
                error={!!errors.industry}
                defaultValue={OneJob.industry}
                helperText={errors.industry?.message}
                variant="standard"
              >
                {options.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Min Salary */}
            <div className="TextField">
              <TextField
                label="Min Salary"
                type="number"
                defaultValue={OneJob.salaryRange.min}
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                fullWidth
                variant="standard"
              />
            </div>

            {/* Max Salary */}
            <div className="TextField">
              <TextField
                label="Max Salary"
                type="number"
                defaultValue={OneJob.salaryRange.max}
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                fullWidth
                variant="standard"
              />
            </div>

            {/* Skills */}
            <div className="TextField">
              <Autocomplete
                multiple
                id="tags-select"
                options={options}
                value={selectedTags}
                onChange={onTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Tags"
                    placeholder="Select or type..."
                    error={!!errors.skills}
                    helperText={errors.skills?.message}
                  />
                )}
                renderTags={(skills, getTagProps) =>
                  skills.map((skill, index) => (
                    <Chip key={index} label={skill} {...getTagProps({ index })} />
                  ))
                }
              />
            </div>

            {/* Job Description */}
            <TextInputer value={textedit} onChange={handleChange} />

            {/* Submit Button */}
            <div className="SubmitContainer">
              <button className="btnSubmit" type="submit">
                {loadz ? <CircularProgress size={30} color="primary" /> : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer hideProgressBar />
    </div>
  );
};

export default UpdateJob;
