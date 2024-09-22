import React, { useState } from 'react';
import {useParams, useNavigate } from "react-router-dom"; 
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { ToastContainer } from "react-toastify";
import TextField from '@mui/material/TextField';
import { Autocomplete, Typography, Chip, Checkbox, MenuItem, CircularProgress } from '@mui/material';
import { ApplicationValid } from '../validation/applicationValid';
import { ApplicationThunk } from '../redux/action/application';
import { Skills } from '../utils/data';

const ApplyForm = () => {
  const [checked, setChecked] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const options = Skills;
  
  // get params
   const {id} = useParams();
   const navigate = useNavigate();

   if(!id){
    navigate('/');
    return;
   }

  // Validation
  const { register, handleSubmit, formState: { errors },setValue,clearErrors } = useForm({
    resolver: yupResolver(ApplicationValid),
    defaultValues: {
      skills: [], // Initialize with an empty array
    },
  });
  const onTagsChange = (event, newValue) => {
    setSelectedTags(newValue);
    setValue('skills', newValue); // Update react-hook-form with the new value
    clearErrors('skills'); // Clear errors if any
  };

  const dispatch = useDispatch();
  const submit =async (data) => {
    if(id){
       const Alldata = {
        ...data
       }
     await  dispatch(ApplicationThunk({Alldata,id}))
    }
   ;
  };
   const { loading} = useSelector((state)=>state.application)
  return (
    <div className="formContainer">
      <div className="FormDiv">
        <form onSubmit={handleSubmit(submit)} className="Form1" noValidate>
          <div className="TextField">
            <TextField
              {...register('firstname')}
              label="First Name"
              fullWidth
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
              variant="standard"
            />
          </div>
          <div className="TextField">
            <TextField
              {...register('secondname')}
              label="Second Name"
              fullWidth
              required
              error={!!errors.secondname}
              helperText={errors.secondname?.message}
              variant="standard"
            />
          </div>
          <div className="TextField">
            <TextField
              {...register('email')}
              label="E-mail"
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
            />
          </div>
          <div className="TextField">
            <TextField
              {...register('gender')}
              label="Gender"
              select
              fullWidth
              required
              error={!!errors.gender}
              helperText={errors.gender?.message}
              variant="standard"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </div>
          <div className="TextField">
            <TextField
              {...register('country')}
              label="Country"
              fullWidth
              required
              error={!!errors.country}
              helperText={errors.country?.message}
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
              {...register('coverletter')}
              label="Cover Letter"
              error={!!errors.coverletter}
              helperText={errors.coverletter?.message}
              multiline
              rows={6}
              variant="standard"
              fullWidth
            />
          </div>
          <div className="checkBox">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              By submitting this form, you agree that the information you provide will be used for internal purposes only. We value your privacy and will handle your data responsibly.
            </Typography>
          </div>
          <div className="TextField">
            <button type="submit" className="SubmitBtn" disabled={!checked}>
            {loading ?<CircularProgress size={30} color="primary" />: "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer hideProgressBar />
    </div>
  );
};

export default ApplyForm;
