import { createSlice } from "@reduxjs/toolkit";
import { UpdateJobThunk } from "../action/editjob";

const initialState = {
    loadz: false,
    updatejobPost: null,
    error: null,
}

const UpdateJobSlice= createSlice({
    name: "updatejobPost",
    initialState,
    reducers: {

    },

    extraReducers: {
      [UpdateJobThunk.pending] : (state) =>{
        return{
            ...state,
            loadz: true
        }
      },
      [UpdateJobThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [UpdateJobThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loadz: false,
            updatejobPost: payload
        }
      }  
    }
})

export default UpdateJobSlice.reducer