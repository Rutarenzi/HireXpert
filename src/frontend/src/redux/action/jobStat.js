import { createAsyncThunk } from "@reduxjs/toolkit";
import { jobStat } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";

export const JobStatThunk = createAsyncThunk("AdminJobstats",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await jobStat();
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue()
    }
}
);