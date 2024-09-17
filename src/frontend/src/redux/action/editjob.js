import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateJob } from "../../utils/endpoints";
import {toast} from "react-toastify";

export const UpdateJobThunk = createAsyncThunk("EditJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await updateJob(data,data.id);
       if(repo.Ok){
        toast.success(repo.Ok)
        return repo.Ok
       }else if(repo.Err){
        toast.error(repo.Err)
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue()
    }
}
);