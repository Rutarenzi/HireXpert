import { createSlice } from "@reduxjs/toolkit";
import { DeleteJobThunk } from "../action/deleteJob";

const initialState = {
    load: false,
    deletePost: null,
    errors: null,
}

const DeleteJobSlice= createSlice({
    name: "deleteJob",
    initialState,
    reducers: {

    },

    extraReducers: {
      [DeleteJobThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [DeleteJobThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            errors:payload
        }
      },
      [DeleteJobThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            load: false,
            deletePost: payload
        }
      }  
    }
})

export default DeleteJobSlice.reducer