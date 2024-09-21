import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateApplication } from "../../utils/endpoints";
import { ToastSuccess,ToastError } from "../../utils/toast";

export const UpdateApplicantsThunk = createAsyncThunk("UpdateApplicants",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await updateApplication(data, id);
       if(repo.Ok){
        ToastSuccess(repo.Ok)
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.NotAllowed && ToastError(repo.Err.NotAllowed)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue()
    }
}
);