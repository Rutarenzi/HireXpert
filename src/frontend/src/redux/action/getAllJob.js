import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJobs } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";

export const AllJobThunk = createAsyncThunk("AllJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getAllJobs();
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