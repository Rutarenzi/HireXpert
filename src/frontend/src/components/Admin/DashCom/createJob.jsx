import React, { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import { ToastContainer } from "react-toastify";
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Autocomplete, Chip, CircularProgress } from '@mui/material';
import { MenuItem } from "@mui/material";
import TextInputer from "./textInput";
import { JobValid } from "../../../validation/jobValid";
import { CreateJobThunk } from "../../../redux/action/job";
import { Skills,Category } from "../../../utils/data";

const CreateJob = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [textedit, setTexteditor] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const dispatch = useDispatch();

  const options = Skills;
  const categories = Category
  
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm({
    resolver: yupResolver(JobValid),
    defaultValues: {
      skills: [], // Initialize with an empty array
    },
  });

  const handleChange = (value) => {
    setTexteditor(value);
  }

  const onTagsChange = (event, newValue) => {
    setSelectedTags(newValue);
    setValue('skills', newValue); // Update react-hook-form with the new value
    clearErrors('skills'); // Clear errors if any
  };

  
  
  const submit = async (data) => {
    const {
     company,
     jobTitle,
     education,
     experience,
     employmentType,
     industry,
     skills
     } =data
    const AllData = {
      company,
      jobTitle,
      jobDescription: textedit,
      requirements: {
        skill: skills,
        educationLevel:education,
        experience
      },
      salaryRange: {
        min:minSalary,
        max: maxSalary
      },
      employmentType,
      industry

    }
  
  dispatch(CreateJobThunk(AllData));
  }
const {load} = useSelector((state)=>state.createJob)
  return (
    <div className="CreateContainer">
      <div className="FormCreate">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="InputDiv">
            <div className="TextField">
              <TextField
                {...register('company')}
                label="Company"
                fullWidth
                error={!!errors.company}
                helperText={errors.company?.message}
                variant="standard"
              />
            </div>

            <div className="TextField">
              <TextField
                {...register('jobTitle')}
                label="Job Title"
                fullWidth
                error={!!errors.jobTitle}
                helperText={errors.jobTitle?.message}
                variant="standard"
              />
            </div>

            <div className="TextField">
              <TextField
                {...register('education')}
                label="Education Level"
                select
                fullWidth
                required
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

            <div className="TextField">
              <TextField
                {...register('experience')}
                label="Experience"
                fullWidth
                required
                error={!!errors.experience}
                helperText={errors.experience?.message}
                variant="standard"
              />
            </div>

            <div className="TextField">
              <TextField
                {...register('employmentType')}
                label="Employment Type"
                select
                fullWidth
                required
                error={!!errors.employementType}
                helperText={errors.employmentType?.message}
                variant="standard"
              >
                <MenuItem value="fullTime">Full-Time</MenuItem>
                <MenuItem value="partTime">Part-Time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
              </TextField>
            </div>

            <div className="TextField">
              <TextField
                {...register('industry')}
                label="Industry"
                select
                fullWidth
                required
                error={!!errors.industry}
                helperText={errors.industry?.message}
                variant="standard"
              >
                {categories.map((item, index) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </div>

            <div className="TextField">
              <TextField
                label="Min Salary"
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                fullWidth
                variant="standard"
              />
            </div>

            <div className="TextField">
              <TextField
                label="Max Salary"
                type="number"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                fullWidth
                variant="standard"
              />
            </div>
          </div>

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
                  <Chip
                    key={index}
                    label={skill}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </div>

          <TextInputer value={textedit} onChange={handleChange} />

          <div className="SubmitContainer">
          
            <button className="btnSubmit" type="submit">
            {load ?<CircularProgress size={30} color="primary" />: "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default CreateJob;
















