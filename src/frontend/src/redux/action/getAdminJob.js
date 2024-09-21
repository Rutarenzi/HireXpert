import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyJobs } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";

export const AdminJobThunk = createAsyncThunk("getAdminJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getMyJobs();
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