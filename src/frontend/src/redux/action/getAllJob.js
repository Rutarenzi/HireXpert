import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJobs } from "../../utils/endpoints";
import {toast} from "react-toastify";

export const AllJobThunk = createAsyncThunk("AllJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getAllJobs();
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