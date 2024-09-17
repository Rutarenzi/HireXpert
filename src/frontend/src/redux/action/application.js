import { createAsyncThunk } from "@reduxjs/toolkit";
import { applyToJob } from "../../utils/endpoints";
import {toast} from "react-toastify";


export const ApplicationThunk = createAsyncThunk("Apply",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await applyToJob(data,data.id);
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