import { createAsyncThunk } from "@reduxjs/toolkit";
import { getJobApplicants } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";

export const JobApplicantsThunk = createAsyncThunk("JobApplicants",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getJobApplicants(data);
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err)}
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.NotAllowed && ToastError(repo.Err.NotAllowed)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue()
    }
}
);