import { createSlice } from "@reduxjs/toolkit";
import { DeleteJobThunk } from "../action/deleteJob";

const initialState = {
    loader: false,
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
            loader: true
        }
      },
      [DeleteJobThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loader:false,
            errors:payload
        }
      },
      [DeleteJobThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loader: false,
            deletePost: payload
        }
      }  
    }
})

export default DeleteJobSlice.reducer