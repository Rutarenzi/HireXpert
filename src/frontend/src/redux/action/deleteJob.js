import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteJob } from "../../utils/endpoints";
import {toast} from "react-toastify";

export const DeleteJobThunk = createAsyncThunk("DeleteJob",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await deleteJob(id);
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