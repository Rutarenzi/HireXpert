import { createSlice } from "@reduxjs/toolkit";
import { UpdateJobThunk } from "../action/editjob";

const initialState = {
    load: false,
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
            load: true
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
            load: false,
            updatejobPost: payload
        }
      }  
    }
})

export default UpdateJobSlice.reducer