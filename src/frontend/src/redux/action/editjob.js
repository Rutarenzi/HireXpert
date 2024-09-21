import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateJob } from "../../utils/endpoints";
import { ToastSuccess,ToastError } from "../../utils/toast";

export const UpdateJobThunk = createAsyncThunk("EditJob",
async(data,{rejectWithValue})=>{
    try{
        const { AllData, id } = data
       const repo = await updateJob(AllData,id);
       if(repo.Ok){
        ToastSuccess("Updated Successfully")
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