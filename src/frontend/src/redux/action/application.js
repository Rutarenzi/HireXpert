import { createAsyncThunk } from "@reduxjs/toolkit";
import { applyToJob } from "../../utils/endpoints";
import { ToastSuccess,ToastError } from "../../utils/toast";


export const ApplicationThunk = createAsyncThunk("Apply",
async(data,{rejectWithValue})=>{
    
    try{
       const {Alldata,id}  = data;
       const repo = await applyToJob(Alldata,id);
       if(repo.Ok){
        ToastSuccess(repo.Ok)
        setTimeout(()=>{
           window.location.href ="/"
        },2500)
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