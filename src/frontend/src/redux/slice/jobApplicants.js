import { createSlice } from "@reduxjs/toolkit";
import { JobApplicantsThunk } from "../action/getJobApplicants";

const initialState = {
    loads: false,
    jobApplicants: null,
    error: null,
}

const JobApplicantSlice= createSlice({
    name: "jobApplicants",
    initialState,
    reducers: {

    },

    extraReducers: {
      [JobApplicantsThunk.pending] : (state) =>{
        return{
            ...state,
            loads: true
        }
      },
      [JobApplicantsThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loads:false,
            error:payload
        }
      },
      [JobApplicantsThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            loads: false,
            jobApplicants: payload
        }
      }  
    }
})

export default JobApplicantSlice.reducer