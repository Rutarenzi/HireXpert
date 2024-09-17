import { createSlice } from "@reduxjs/toolkit";
import { CreateJobThunk } from "../action/job";

const initialState = {
    load: false,
    jobPost: null,
    error: null,
}

const CreateJobSlice= createSlice({
    name: "jobPost",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CreateJobThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [CreateJobThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [CreateJobThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            load: false,
            jobPost: payload
        }
      }  
    }
})

export default CreateJobSlice.reducer