import { createSlice } from "@reduxjs/toolkit";
import { ApplicationThunk } from "../action/application";

const initialState = {
    loading: false,
    message: null,
    error: null,
}

const ApplicationSlice= createSlice({
    name: "application",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ApplicationThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [ApplicationThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading: false,
            error:payload
        }
      },
      [ApplicationThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            loading: false,
            status: payload
        }
      }  
    }
})

export default ApplicationSlice.reducer