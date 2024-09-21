import { createAsyncThunk } from "@reduxjs/toolkit";
import { createJob } from "../../utils/endpoints";
import {ToastSuccess, ToastError } from "../../utils/toast";

export const CreateJobThunk = createAsyncThunk("CreateJob",
async(data,{rejectWithValue})=>{
    try{
       
       const repo = await createJob(data);
       if(repo.Ok){
         ToastSuccess("Create successfully")
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