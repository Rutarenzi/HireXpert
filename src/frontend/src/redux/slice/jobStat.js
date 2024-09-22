import { createSlice } from "@reduxjs/toolkit";
import { JobStatThunk } from "../action/jobStat";

const initialState = {
    loadings: false,
    JobStat: null,
    error: null,
}

const JobStatSlice= createSlice({
    name: "jobStat",
    initialState,
    reducers: {

    },

    extraReducers: {
      [JobStatThunk.pending] : (state) =>{
        return{
            ...state,
            loadings: true
        }
      },
      [JobStatThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loadings: false,
            error:payload
        }
      },
      [JobStatThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loadings: false,
            JobStat: payload
        }
      }  
    }
})

export default JobStatSlice.reducer