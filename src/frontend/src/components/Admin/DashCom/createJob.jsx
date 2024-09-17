import React,{useState} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate } from "react-router-dom"; 
import { ToastContainer } from "react-toastify";
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Autocomplete,Typography, Chip,Checkbox} from '@mui/material'
import {MenuItem} from "@mui/material";
import TextInputer from "./textInput";
import {JobValid }from "../../../validation/jobValid"
import { CreateJobThunk } from "../../../redux/action/job";

const CreateJob=()=>{
    const [selectedTags, setSelectedTags] = useState([]);
    const [textedit,setTexteditor] = useState('');
    const options = ['React', 'ReactNative', 'Javascript/Typescript', 'Nodejs', 'Nextjs'];
       
    
    const { register, handleSubmit, formState: { errors },setValue,clearErrors } = useForm({
      resolver: yupResolver(JobValid),
      defaultValues: {
        tags: [], // Initialize with an empty array
      },
    });
    //text
    const handleChange=(value)=>{
      setTexteditor(value)
    }
    // tags
    const onTagsChange = (event, newValue) => {
      setSelectedTags(newValue);
      setValue('tags', newValue); // Update react-hook-form with the new value
      clearErrors('tags'); // Clear errors if any
    };
     const dispatch = useDispatch();
    const submit=async(data)=>{
     const AllData={
      ...data,
      "requirements": textedit
     }
     await dispatch(CreateJobThunk(data))
    }

    return(
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
              {...register('employementType')}
              label="employement Type"
              select
              fullWidth
              required
              error={!!errors.employementType}
              helperText={errors.employementType?.message}
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
              label="industry"
              select
              fullWidth
              required
              error={!!errors.industry}
              helperText={errors.industry?.message}
              variant="standard"
            >
                <MenuItem value="Primary">Software Engineering</MenuItem>
              <MenuItem value="Secondary">Designer</MenuItem>
              <MenuItem value="university">Photographer</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
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
                  error={!!errors.tags}
                  helperText={errors.tags?.message}
                />
              )}
              renderTags={(tags, getTagProps) =>
                tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </div>
    <TextInputer value={textedit} onChange={handleChange}/>
    <div className="SubmitContainer">
             <button className="btnSubmit">
                Submit
             </button>
        </div>
           </form>
        </div>
        <ToastContainer hideProgressBar />
       </div>
    )
}

export default CreateJob;