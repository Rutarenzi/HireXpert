import { createSlice } from "@reduxjs/toolkit";
import { AllJobThunk } from "../action/getAllJob";

const initialState = {
    loading: false,
    AllJob: null,
    error: null,
}

const AllJobSlice= createSlice({
    name: "AllJob",
    initialState,
    reducers: {

    },

    extraReducers: {
      [AllJobThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [AllJobThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading: false,
            error:payload
        }
      },
      [AllJobThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            AllJob: payload
        }
      }  
    }
})

export default AllJobSlice.reducer