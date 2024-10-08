import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteJob } from "../../utils/endpoints";
import { ToastSuccess,ToastError } from "../../utils/toast";

export const DeleteJobThunk = createAsyncThunk("DeleteJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await deleteJob(data);
       if(repo.Ok){
        ToastSuccess("Deleted Successfully")
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