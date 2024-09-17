import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyJobs } from "../../utils/endpoints";
import {toast} from "react-toastify";

export const AdminJobThunk = createAsyncThunk("getAdminJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getMyJobs();
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