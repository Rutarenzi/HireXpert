import { createAsyncThunk } from "@reduxjs/toolkit";
import { createJob } from "../../utils/endpoints";
import {toast} from "react-toastify";

export const CreateJobThunk = createAsyncThunk("Apply",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await createJob(data);
       if(repo.Ok){
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