import React, { useState } from 'react';
import {useParams, useNavigate } from "react-router-dom"; 
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { ToastContainer } from "react-toastify";
import TextField from '@mui/material/TextField';
import { Autocomplete, Typography, Chip, Checkbox, MenuItem } from '@mui/material';
import { ApplicationValid } from '../validation/applicationValid';
import { ApplicationThunk } from '../redux/action/application';

const ApplyForm = () => {
  const [checked, setChecked] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const options = ['React', 'ReactNative', 'Javascript/Typescript', 'Nodejs', 'Nextjs'];

  const changePdf = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function () {
          const pdfData = reader.result;
          sessionStorage.setItem('cv', pdfData);
        };
        reader.readAsDataURL(e.target.files[0]);
        setPdfFile(e.target.files[0]);
      } else {
        setPdfFile(null);
        sessionStorage.clear();
        alert('Please select a PDF file');
      }
    }
  };
  // get params
   const {id} = useParams();
   const navigate = useNavigate();

   if(!id){
    navigate('/');
    return null
   }

  // Validation
  const { register, handleSubmit, formState: { errors },setValue,clearErrors } = useForm({
    resolver: yupResolver(ApplicationValid),
    defaultValues: {
      tags: [], // Initialize with an empty array
    },
  });
  const onTagsChange = (event, newValue) => {
    setSelectedTags(newValue);
    setValue('tags', newValue); // Update react-hook-form with the new value
    clearErrors('tags'); // Clear errors if any
  };

  const dispatch = useDispatch();
  const submit =async (data) => {
    if(id && pdfFile){
       const Alldata = {
        ...data,
        id,
        "coverLetter":pdfFile
       }
     await  dispatch(ApplicationThunk(Alldata))
    }
   ;
  };

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
              label="Upload PDF"
              variant="standard"
              fullWidth
              InputProps={{
                startAdornment: (
                  <input
                    accept="application/pdf"
                    id="resume"
                    type="file"
                    onChange={changePdf}
                  />
                ),
              }}
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
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer hideProgressBar />
    </div>
  );
};

export default ApplyForm;
