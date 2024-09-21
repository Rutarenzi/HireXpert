import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOneJob } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";

export const OneJobThunk = createAsyncThunk("OneJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getOneJob(data);
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.Error && ToastError(repo.Err.Error)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue()
    }
}
);